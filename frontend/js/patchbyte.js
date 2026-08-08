/**
 * PatchByte – Supabase cart / checkout / contact integration
 * Intercepts Shopify-style fetch calls and routes them to Supabase REST API.
 * Inject this script inside <head> on every page so the override is active
 * before any DOMContentLoaded handler runs.
 */
(function () {
  'use strict';

  var SB_URL = 'https://hjnowvzxusjjyhxxgdji.supabase.co';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbm93dnp4dXNqanloeHhnZGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NjE2MzgsImV4cCI6MjA5NDUzNzYzOH0.vf-N61uWE7A3vaEgxFPNYvKvggZ7ppl1JnEldm3Ofxs';

  function getHeaders() {
    return {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json'
    };
  }

  // Load Supabase credentials from the server (env-configurable) and fall
  // back to the bundled defaults above. Resolves quickly; every Supabase
  // call awaits it so the first cart request always uses the right config.
  var configPromise = (async function () {
    try {
      var res = await fetch('/api/supabase-config');
      var cfg = await res.json();
      if (cfg && cfg.supabaseUrl) SB_URL = cfg.supabaseUrl;
      if (cfg && cfg.supabaseAnonKey) SB_KEY = cfg.supabaseAnonKey;
    } catch (e) { /* keep bundled defaults */ }
  })();

  // ── Session ───────────────────────────────────────────────────────────────

  function getSession() {
    var sid = localStorage.getItem('pb_session');
    if (!sid) {
      sid = (crypto.randomUUID ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2));
      localStorage.setItem('pb_session', sid);
    }
    return sid;
  }

  // ── Supabase REST helpers (use saved original fetch) ──────────────────────

  async function sbFetch(path, init) {
    await configPromise;
    init = init || {};
    init.headers = Object.assign({}, getHeaders(), init.headers || {});
    return (window._pbOriginalFetch || fetch)(SB_URL + '/rest/v1/' + path, init);
  }

  async function sbGet(path) {
    var res = await sbFetch(path, {});
    if (!res.ok) return [];
    return res.json();
  }

  async function sbPost(table, data) {
    var res = await sbFetch(table, {
      method: 'POST',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    var text = await res.text();
    try { return JSON.parse(text); } catch (e) { return text; }
  }

  async function sbPatch(table, match, data) {
    var res = await sbFetch(table + '?' + match, {
      method: 'PATCH',
      headers: { 'Prefer': 'return=representation' },
      body: JSON.stringify(data)
    });
    var text = await res.text();
    try { return JSON.parse(text); } catch (e) { return text; }
  }

  async function sbDelete(table, match) {
    await sbFetch(table + '?' + match, { method: 'DELETE' });
  }

  // ── Cart CRUD ─────────────────────────────────────────────────────────────

  async function getCart() {
    var sid = getSession();
    return sbGet('cart_items?session_id=eq.' + encodeURIComponent(sid) + '&order=created_at.asc');
  }

  async function addToCart(item) {
    var sid = getSession();
    var existing = await sbGet(
      'cart_items?session_id=eq.' + encodeURIComponent(sid) +
      '&product_slug=eq.' + encodeURIComponent(item.product_slug) +
      '&select=id,quantity'
    );
    if (existing && existing.length > 0) {
      await sbPatch('cart_items', 'id=eq.' + existing[0].id, {
        quantity: existing[0].quantity + item.quantity
      });
    } else {
      await sbPost('cart_items', {
        session_id: sid,
        product_slug: item.product_slug,
        product_name: item.product_name,
        unit_price: item.unit_price,
        quantity: item.quantity,
        properties: item.properties || {}
      });
    }
    await refreshCartCount();
  }

  async function updateCartItem(id, quantity) {
    if (quantity <= 0) {
      await sbDelete('cart_items', 'id=eq.' + id);
    } else {
      await sbPatch('cart_items', 'id=eq.' + id, { quantity: quantity });
    }
    await refreshCartCount();
  }

  async function clearCart() {
    var sid = getSession();
    await sbDelete('cart_items', 'session_id=eq.' + encodeURIComponent(sid));
    refreshCartCount();
  }

  // ── Cart badge ────────────────────────────────────────────────────────────

  async function refreshCartCount() {
    try {
      var items = await getCart();
      var count = (items || []).reduce(function (s, i) { return s + (i.quantity || 0); }, 0);
      setBadge(count);
    } catch (e) { /* silent */ }
  }

  function setBadge(count) {
    // Shopify-style cart bubble elements
    document.querySelectorAll('.cart-bubble__text-count').forEach(function (el) {
      el.textContent = count > 0 ? String(count) : '';
      el.classList.toggle('hidden', count === 0);
    });
    document.querySelectorAll('.cart-bubble').forEach(function (el) {
      el.classList.toggle('visually-hidden', count === 0);
    });
    // Generic data attributes
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = String(count);
    });
  }

  // ── Fetch intercept ───────────────────────────────────────────────────────

  window._pbOriginalFetch = window.fetch.bind(window);

  window.fetch = async function (url, options) {
    var urlStr = (typeof url === 'string') ? url
      : (url instanceof Request ? url.url : String(url));

    if (urlStr.includes('/cart/add')) {
      return handleCartAdd(options);
    }
    if (urlStr.includes('/cart/change') || urlStr.includes('/cart/update')) {
      return new Response(JSON.stringify({ item_count: 0 }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    }
    if (urlStr.match(/\/cart\.js$/) || urlStr.includes('/cart.json')) {
      var items = await getCart();
      var ic = (items || []).reduce(function (s, i) { return s + i.quantity; }, 0);
      return new Response(JSON.stringify({ token: getSession(), item_count: ic, items: [] }), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    }

    return window._pbOriginalFetch(url, options);
  };

  async function handleCartAdd(options) {
    try {
      console.log('[PatchByte] handleCartAdd called', options);
      var pathname = window.location.pathname;
      var slugMatch = pathname.match(/\/products\/([^/]+)/);
      var product_slug = slugMatch ? slugMatch[1] : 'unknown';
      var quantity = 1;
      var properties = {};

      if (options && options.body instanceof FormData) {
        var fd = options.body;
        if (fd.get('quantity')) quantity = parseInt(fd.get('quantity'), 10) || 1;
        for (var pair of fd.entries()) {
          if (pair[0].startsWith('properties[') && !(pair[1] instanceof File)) {
            var k = pair[0].replace(/^properties\[/, '').replace(/\]$/, '');
            properties[k] = pair[1];
          }
        }
      }

      var nameEl = document.querySelector('h1.product__title, h1[itemprop="name"], .product-single__title, h1');
      var product_name = nameEl ? nameEl.textContent.trim().replace(/\s+/g, ' ') : product_slug;

      // #unit-price-display is the live per-unit price (updates with qty tier)
      // og:price:amount meta is the base price fallback
      var unitPriceEl = document.getElementById('unit-price-display');
      var ogMeta = document.querySelector('meta[property="og:price:amount"]');
      var unit_price = 0;
      if (unitPriceEl) {
        unit_price = parseFloat(unitPriceEl.textContent.replace(/[^0-9.]/g, '')) || 0;
      } else if (ogMeta) {
        unit_price = parseFloat(ogMeta.getAttribute('content')) || 0;
      }

      // If no price found, try to get from price display elements
      if (unit_price === 0) {
        var priceEl = document.querySelector('.price, .product-price, [data-price]');
        if (priceEl) {
          unit_price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')) || 0;
        }
      }

      console.log('[PatchByte] Adding to cart:', { product_slug, product_name, unit_price, quantity, properties });

      // Capture product image for cart display
      var product_image = '';
      var productImg = document.querySelector(
        '.product__media img, .media-gallery__media img, [data-media-type="image"] img, .product-single__photo img'
      );
      if (productImg && productImg.src && !productImg.src.startsWith('data:')) {
        product_image = productImg.src;
      } else {
        var ogImg = document.querySelector('meta[property="og:image"]');
        if (ogImg) {
          // Fix Shopify's malformed "http:/cdn/..." export artifacts → "/cdn/..."
          product_image = (ogImg.getAttribute('content') || '').replace(/^https?:\/cdn\//, '/cdn/');
        }
      }

      var props = Object.assign({}, properties);
      if (product_image) props._image = product_image;

      await addToCart({ product_slug, product_name, unit_price, quantity, properties: props });
      showCartToast(product_name);

      var mockItem = {
        id: Date.now(), title: product_name, quantity: quantity,
        price: Math.round(unit_price * 100), handle: product_slug,
        key: product_slug + ':' + Date.now()
      };
      return new Response(JSON.stringify(mockItem), {
        status: 200, headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error('[PatchByte] Cart add error:', err);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 422, headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // ── Contact form ──────────────────────────────────────────────────────────

  function wireContactForm() {
    var form = document.querySelector('.contact-form__form, form[id*="ContactForm"]');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var name    = (form.querySelector('[name="contact[name]"]')?.value || '').trim();
      var email   = (form.querySelector('[name="contact[email]"]')?.value || '').trim();
      var phone   = (form.querySelector('[name="contact[phone]"]')?.value || '').trim();
      var message = (form.querySelector('[name="contact[body]"]')?.value || '').trim();

      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      try {
        await sbPost('contact_submissions', { name, email, phone, message });
        form.innerHTML = '<div style="padding:2rem;text-align:center;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">' +
          '<div style="font-size:2.5rem;margin-bottom:0.5rem;">✓</div>' +
          '<h3 style="color:#166534;margin:0 0 0.5rem;">Message Sent!</h3>' +
          '<p style="color:#166534;margin:0;">Thank you' + (name ? ', ' + name : '') + '! We\'ll be in touch shortly.</p></div>';
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = 'Submit'; }
        alert('Failed to send. Please try again.');
        console.error('[PatchByte] Contact error:', err);
      }
    });
  }

  // ── Cart toast notification ───────────────────────────────────────────────

  function showCartToast(productName) {
    var existing = document.getElementById('pb-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.id = 'pb-toast';
    toast.innerHTML =
      '<span style="flex:1;">&#10003; <strong>' + (productName || 'Item') + '</strong> added to cart</span>' +
      '<a href="/cart" style="color:#fff;font-weight:700;text-decoration:underline;white-space:nowrap;margin-left:1rem;">View Cart &rarr;</a>';
    toast.style.cssText =
      'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);' +
      'background:#111827;color:#fff;padding:.875rem 1.5rem;border-radius:100px;' +
      'display:flex;align-items:center;gap:.5rem;z-index:9999;' +
      'box-shadow:0 4px 20px rgba(0,0,0,0.35);font-size:.9375rem;max-width:90vw;';

    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity .4s';
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  }

  // ── Fix cart icon → navigate to /cart ────────────────────────────────────

  function wireCartIcon() {
    function navToCart() { window.location.href = '/cart'; }

    function goToCart(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
      navToCart();
    }

    // Scan every button and redirect cart-related ones to /cart
    document.querySelectorAll('button').forEach(function (btn) {
      var onclick  = btn.getAttribute('onclick') || '';
      var onclickProp = btn.getAttribute('on:click') || '';
      var testid   = btn.getAttribute('data-testid') || '';
      var label    = btn.getAttribute('aria-label') || '';
      var hasCartIcon = !!btn.querySelector('cart-icon');

      var isCartBtn =
        hasCartIcon ||
        onclick.includes('cart-drawer') ||
        onclickProp.includes('/open') ||
        testid === 'cart-drawer-trigger' ||
        label === 'Cart';

      if (isCartBtn) {
        btn.removeAttribute('onclick');   // kill inline handler
        btn.addEventListener('click', goToCart, true); // capture beats bubble
      }
    });

    // The Shopify cart drawer cannot render Supabase cart data on this
    // static site (it would open empty), so make opening it navigate to
    // the real /cart page instead — this is what happens after "Add to
    // Cart" on product pages.
    var drawer = document.querySelector('cart-drawer-component');
    if (drawer) {
      drawer.open = navToCart;
      drawer.showDialog = navToCart;
      if (typeof drawer.show === 'function') drawer.show = navToCart;
    }
  }

  // ── Init ──────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    refreshCartCount();
    wireContactForm();
    wireCartIcon();
  });

  // Public API used by cart.html and checkout.html
  window.PatchByte = {
    getSession: getSession,
    getCart: getCart,
    addToCart: addToCart,
    updateCartItem: updateCartItem,
    clearCart: clearCart,
    refreshCartCount: refreshCartCount,
    sbPost: sbPost,
    sbGet: sbGet,
    sbPatch: sbPatch,
    sbDelete: sbDelete
  };

}());
