/* Patch Kraft Admin Portal — vanilla JS SPA. */
(function () {
  'use strict';

  var API = '/api/admin';
  var TOKEN_KEY = 'pk_admin_token';

  var STATUSES = ['pending', 'confirmed', 'in_production', 'shipped', 'paid', 'completed', 'cancelled'];
  var STATUS_LABELS = {
    pending: 'Pending', confirmed: 'Confirmed', in_production: 'In Production',
    shipped: 'Shipped', paid: 'Paid', completed: 'Completed', cancelled: 'Cancelled'
  };
  var PAYMENTS = ['paid', 'unpaid', 'partially_refunded', 'refunded', 'failed'];
  var PAYMENT_LABELS = {
    paid: 'Paid', unpaid: 'Unpaid', partially_refunded: 'Partially Refunded',
    refunded: 'Refunded', failed: 'Failed'
  };

  // ── Helpers ─────────────────────────────────────────────────────────────

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function money(n) {
    var v = Number(n) || 0;
    return '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fmtDate(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function fmtDateTime(iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
      ', ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }

  function badge(status) {
    return '<span class="badge b-' + esc(status) + '">' + esc(STATUS_LABELS[status] || status) + '</span>';
  }

  // Show the friendly order number when the DB has one, else a short id.
  function orderLabel(o) {
    var n = o && o.order_number;
    if (n) return '#' + n;
    var id = o && o.id ? String(o.id) : '';
    return '#' + (id.length > 8 ? id.slice(0, 8) : id);
  }
  function payBadge(p) {
    return '<span class="badge b-' + esc(p) + '">' + esc(PAYMENT_LABELS[p] || p) + '</span>';
  }

  function toast(msg, kind) {
    var el = $('#toast');
    el.textContent = msg;
    el.className = 'toast' + (kind === 'ok' ? ' ok' : kind === 'err' ? ' err' : '');
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.hidden = true; }, 3200);
  }

  function loading(label) {
    return '<div class="loading"><span class="spinner"></span>' + esc(label || 'Loading…') + '</div>';
  }

  function emptyState(title, sub) {
    return '<div class="empty-state"><div class="big">📦</div><div class="strong">' + esc(title) + '</div>' +
      (sub ? '<p>' + esc(sub) + '</p>' : '') + '</div>';
  }

  // ── API ─────────────────────────────────────────────────────────────────

  function token() { return sessionStorage.getItem(TOKEN_KEY) || ''; }

  function setToken(t) { sessionStorage.setItem(TOKEN_KEY, t); }

  async function api(path, options) {
    options = options || {};
    var res = await fetch(API + path, Object.assign({}, options, {
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token()
      }, options.headers || {})
    }));
    if (res.status === 401) {
      logout(true);
      throw new Error('Session expired — please sign in again.');
    }
    var text = await res.text();
    var data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
    if (!res.ok) {
      var msg = data && data.error ? data.error : 'Request failed (' + res.status + ')';
      throw new Error(msg);
    }
    return data;
  }

  // ── Auth ────────────────────────────────────────────────────────────────

  var loginView = $('#login-view');
  var appView = $('#app');

  function showLogin() {
    appView.hidden = true;
    loginView.hidden = false;
    setTimeout(function () { $('#login-password').focus(); }, 50);
  }

  function showApp() {
    loginView.hidden = true;
    appView.hidden = false;
  }

  function logout(expired) {
    sessionStorage.removeItem(TOKEN_KEY);
    showLogin();
    if (expired) {
      $('#login-error').textContent = 'Your session expired. Please sign in again.';
      $('#login-error').hidden = false;
    }
  }

  async function verifySession() {
    if (!token()) return false;
    try {
      var data = await api('/me');
      showApp();
      if (data.warning) showBanner(data.warning);
      if (data.schema === 'legacy') showBanner('Database is pre-migration — run admin-migration.sql in Supabase to unlock payment status, refunds and tracking.');
      route();
      return true;
    } catch (e) {
      return false;
    }
  }

  $('#login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    var btn = $('#login-btn');
    var errEl = $('#login-error');
    errEl.hidden = true;
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    try {
      var data = await fetch(API + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: $('#login-password').value })
      }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); });
      if (!data.ok) throw new Error(data.body.error || 'Sign-in failed.');
      setToken(data.body.token);
      if (data.body.warning) showBanner(data.body.warning);
      if (data.body.schema === 'legacy') showBanner('Database is pre-migration — run admin-migration.sql in Supabase to unlock payment status, refunds and tracking.');
      showApp();
      route();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.hidden = false;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  });

  $('#logout-btn').addEventListener('click', function () { logout(); });

  // ── Banner ──────────────────────────────────────────────────────────────

  function showBanner(msg) {
    var el = $('#alert-banner');
    el.textContent = msg;
    el.hidden = false;
  }

  // ── Router ──────────────────────────────────────────────────────────────

  function currentRoute() {
    var h = window.location.hash.replace(/^#\/?/, '');
    return h.split('?')[0] || 'dashboard';
  }

  function route() {
    var r = currentRoute();
    $$('.nav-link[data-route]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-route') === r);
    });
    if (r === 'orders') renderOrders();
    else if (r === 'reports') renderReports();
    else renderDashboard();
  }

  window.addEventListener('hashchange', route);

  $('#refresh-btn').addEventListener('click', function () { route(); });

  // ── Dashboard ───────────────────────────────────────────────────────────

  async function renderDashboard() {
    var view = $('#view');
    $('#page-title').textContent = 'Dashboard';
    $('#page-sub').textContent = 'Store overview & analytics';
    view.innerHTML = loading('Loading analytics…');
    try {
      var s = await api('/stats');
      setPageSub(s);
      view.innerHTML = dashboardHTML(s);
      $('#nav-order-count').textContent = String(s.kpis.activeOrders);
      $('#nav-order-count').hidden = false;
      wireDashboard(s);
    } catch (err) {
      view.innerHTML = '<div class="alert alert-error" style="max-width:640px;margin:2rem auto;">' + esc(err.message) + '</div>';
    }
  }

  function setPageSub(s) {
    if (!s) return;
    $('#page-sub').textContent = 'Updated ' + fmtDateTime(s.generatedAt) +
      (s.legacyMode ? ' · pre-migration mode (run admin-migration.sql for full fields)' : '');
  }

  function dashboardHTML(s) {
    var k = s.kpis;
    var html = '';

    // KPI cards
    html += '<div class="kpi-grid">' +
      kpiCard('Net Revenue', money(k.netRevenue), 'Gross ' + money(k.grossRevenue) + ' · refunds ' + money(k.refundAmount), 'up') +
      kpiCard('Orders', String(k.orders), k.aov ? 'AOV ' + money(k.aov) : 'No orders yet') +
      kpiCard('Active Orders', String(k.activeOrders), 'pending → shipped', 'warn') +
      kpiCard('Completed', String(k.completedOrders), k.orders ? Math.round(k.completedOrders / k.orders * 100) + '% of all orders' : '—') +
      kpiCard('Refunds', String(k.refundCount), money(k.refundAmount) + ' refunded', k.refundCount ? 'danger' : '') +
      '</div>';

    // Revenue chart + donuts
    html += '<div class="grid-2">';
    html += '<div class="panel"><div class="panel-head"><h2>Net Revenue — Last 30 Days</h2></div><div class="panel-body">' +
      barsChart(s.daily) + '</div></div>';
    html += '<div class="panel"><div class="panel-head"><h2>Order Status</h2></div><div class="panel-body">' +
      donut(s.statusBreakdown, 'status') + '</div></div>';
    html += '</div>';

    // Payment + top products
    html += '<div class="grid-2">';
    html += '<div class="panel"><div class="panel-head"><h2>Payment Status</h2></div><div class="panel-body">' +
      donut(s.paymentBreakdown, 'payment') + '</div></div>';
    html += '<div class="panel"><div class="panel-head"><h2>Top Products</h2></div><div class="panel-body">' +
      topProductsHTML(s.topProducts) + '</div></div>';
    html += '</div>';

    // Recent orders
    html += '<div class="panel"><div class="panel-head"><h2>Recent Orders</h2><a href="#/orders" class="btn btn-sm btn-ghost">View all</a></div><div class="panel-body">' +
      recentOrdersHTML(s.recentOrders) + '</div></div>';

    return html;
  }

  function kpiCard(label, value, sub, tone) {
    return '<div class="kpi"><div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value' + (tone ? ' ' + tone : '') + '">' + esc(value) + '</div>' +
      (sub ? '<div class="kpi-sub">' + esc(sub) + '</div>' : '') + '</div>';
  }

  function barsChart(daily) {
    var max = Math.max.apply(null, daily.map(function (d) { return d.revenue; })) || 1;
    var bars = daily.map(function (d) {
      var h = Math.max(d.revenue / max * 100, 1.5);
      return '<div class="bar" style="height:' + h + '%">' +
        '<span class="tip">' + fmtDate(d.date) + ' · ' + money(d.revenue) + ' · ' + d.orders + ' order' + (d.orders === 1 ? '' : 's') + '</span></div>';
    }).join('');
    var labels = [daily[0], daily[Math.floor(daily.length / 2)], daily[daily.length - 1]].map(function (d) {
      return fmtDate(d.date);
    }).join('<span></span>');
    return '<div class="chart-bars">' + bars + '</div><div class="chart-x">' + labels + '</div>';
  }

  function donut(breakdown, kind) {
    var withData = breakdown.filter(function (b) { return b.count > 0; });
    if (!withData.length) return '<div class="muted">No data yet.</div>';
    var total = withData.reduce(function (s, b) { return s + b.count; }, 0);
    var totalRev = withData.reduce(function (s, b) { return s + b.revenue; }, 0);
    var R = 42, C = 2 * Math.PI * R;
    var offset = 0;
    var colors = kind === 'status'
      ? { pending: '#f59e0b', confirmed: '#3b82f6', in_production: '#8b5cf6', shipped: '#14b8a6', paid: '#f59e0b', completed: '#10b981', cancelled: '#ef4444' }
      : { paid: '#10b981', unpaid: '#f59e0b', partially_refunded: '#fb923c', refunded: '#ef4444', failed: '#6b7280' };
    var segs = withData.map(function (b) {
      var frac = b.count / total;
      var seg = '<circle r="' + R + '" cx="60" cy="60" fill="none" stroke="' + (colors[b.status] || '#9ca3af') +
        '" stroke-width="17" stroke-dasharray="' + (frac * C).toFixed(2) + ' ' + C.toFixed(2) +
        '" stroke-dashoffset="' + (-offset).toFixed(2) + '" transform="rotate(-90 60 60)"></circle>';
      offset += frac * C;
      return seg;
    }).join('');
    var legend = withData.map(function (b) {
      var pct = Math.round(b.count / total * 100);
      return '<div class="legend-row"><span class="legend-dot" style="background:' + (colors[b.status] || '#9ca3af') + '"></span>' +
        '<span class="l-name">' + esc(kind === 'status' ? (STATUS_LABELS[b.status] || b.status) : (PAYMENT_LABELS[b.status] || b.status)) + '</span>' +
        '<span class="l-val">' + b.count + '</span>' +
        '<span class="l-pct">' + pct + '%</span></div>';
    }).join('');
    return '<div class="donut-wrap">' +
      '<svg width="120" height="120" viewBox="0 0 120 120">' + segs +
      '<text x="60" y="57" text-anchor="middle" font-size="17" font-weight="700" fill="#111827">' + total + '</text>' +
      '<text x="60" y="72" text-anchor="middle" font-size="8.5" fill="#6b7280">ORDERS</text></svg>' +
      '<div class="donut-legend">' + legend +
      '<div class="legend-row" style="border-top:1px solid #f3f4f6;margin-top:.4rem;padding-top:.5rem;">' +
      '<span class="l-name strong">Revenue</span><span class="l-val">' + money(totalRev) + '</span></div></div></div>';
  }

  function topProductsHTML(products) {
    if (!products.length) return '<div class="muted">No product data yet.</div>';
    return '<div class="top-products">' + products.map(function (p, i) {
      return '<div class="tp-row"><span class="tp-rank">' + (i + 1) + '</span>' +
        '<span class="tp-name" title="' + esc(p.name) + '">' + esc(p.name) + '</span>' +
        '<span class="tp-qty">' + p.quantity + ' sold</span>' +
        '<span class="tp-rev">' + money(p.revenue) + '</span></div>';
    }).join('') + '</div>';
  }

  function recentOrdersHTML(orders) {
    if (!orders.length) return '<div class="muted">No orders yet.</div>';
    var rows = orders.map(function (o) {
      return '<tr class="clickable" onclick="window.__openOrder(' + JSON.stringify(o.id) + ')">' +
        '<td><span class="order-id">' + orderLabel(o) + '</span></td>' +
        '<td>' + fmtDateTime(o.created_at) + '</td>' +
        '<td class="strong">' + money(o.total) + '</td>' +
        '<td>' + badge(o.status) + '</td>' +
        '<td>' + payBadge(o.payment_status) + '</td></tr>';
    }).join('');
    return '<div class="table-wrap"><table class="orders"><thead><tr>' +
      '<th>Order</th><th>Date</th><th>Total</th><th>Status</th><th>Payment</th></tr></thead><tbody>' +
      rows + '</tbody></table></div>';
  }

  function wireDashboard(s) {
    // recent order rows already carry inline onclick via __openOrder
  }

  // ── Orders ──────────────────────────────────────────────────────────────

  var ordersState = {
    q: '', status: 'active', payment: '', from: '', to: '',
    page: 1, perPage: 25, total: 0, data: [], selected: {}
  };

  async function renderOrders() {
    var view = $('#view');
    $('#page-title').textContent = 'Orders';
    $('#page-sub').textContent = 'Track, fulfill and manage orders';
    view.innerHTML =
      ordersToolbar() +
      '<div id="bulk-bar"></div>' +
      '<div id="orders-table" class="panel">' + loading('Loading orders…') + '</div>';

    wireOrdersToolbar();
    await loadOrders();
  }

  function ordersToolbar() {
    var statusOptions = [
      ['active', 'Current (active)'], ['past', 'Past (completed/cancelled)'], ['all', 'All'],
      ['pending', 'Pending'], ['confirmed', 'Confirmed'], ['in_production', 'In Production'],
      ['shipped', 'Shipped'], ['completed', 'Completed'], ['cancelled', 'Cancelled']
    ].map(function (o) {
      return '<option value="' + o[0] + '"' + (ordersState.status === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
    }).join('');
    var payOptions = ['', 'paid', 'unpaid', 'partially_refunded', 'refunded', 'failed'].map(function (p) {
      return '<option value="' + p + '"' + (ordersState.payment === p ? ' selected' : '') + '>' +
        (p ? (PAYMENT_LABELS[p] || p) : 'Any payment') + '</option>';
    }).join('');
    return '<div class="toolbar">' +
      '<input type="text" id="f-q" placeholder="Search name, email or order #…" value="' + esc(ordersState.q) + '">' +
      '<select id="f-status">' + statusOptions + '</select>' +
      '<select id="f-payment">' + payOptions + '</select>' +
      '<input type="date" id="f-from" value="' + esc(ordersState.from) + '" title="From date">' +
      '<input type="date" id="f-to" value="' + esc(ordersState.to) + '" title="To date">' +
      '<button id="f-apply" class="btn btn-primary btn-sm">Apply</button>' +
      '<button id="f-clear" class="btn btn-ghost btn-sm">Clear</button>' +
      '<button id="f-export" class="btn btn-ghost btn-sm" style="margin-left:auto;">⤓ Export CSV</button>' +
      '</div>';
  }

  function wireOrdersToolbar() {
    $('#f-apply').addEventListener('click', function () {
      ordersState.q = $('#f-q').value.trim();
      ordersState.status = $('#f-status').value;
      ordersState.payment = $('#f-payment').value;
      ordersState.from = $('#f-from').value;
      ordersState.to = $('#f-to').value;
      ordersState.page = 1;
      ordersState.selected = {};
      loadOrders();
    });
    $('#f-q').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') $('#f-apply').click();
    });
    $('#f-clear').addEventListener('click', function () {
      ordersState.q = ''; ordersState.status = 'active'; ordersState.payment = '';
      ordersState.from = ''; ordersState.to = ''; ordersState.page = 1; ordersState.selected = {};
      $('#f-q').value = ''; $('#f-status').value = 'active'; $('#f-payment').value = '';
      $('#f-from').value = ''; $('#f-to').value = '';
      loadOrders();
    });
    $('#f-export').addEventListener('click', exportCSV);
  }

  async function loadOrders() {
    var wrap = $('#orders-table');
    if (!wrap) return;
    wrap.innerHTML = loading('Loading orders…');
    try {
      var params = new URLSearchParams({
        page: String(ordersState.page),
        per_page: String(ordersState.perPage)
      });
      if (ordersState.q) params.set('q', ordersState.q);
      if (ordersState.status) params.set('status', ordersState.status);
      if (ordersState.payment) params.set('payment', ordersState.payment);
      if (ordersState.from) params.set('from', ordersState.from);
      if (ordersState.to) params.set('to', ordersState.to);

      var data = await api('/orders?' + params.toString());
      ordersState.data = data.orders || [];
      ordersState.total = data.total || 0;
      // drop selections for orders no longer on the page
      Object.keys(ordersState.selected).forEach(function (id) {
        if (!ordersState.data.some(function (o) { return String(o.id) === id; })) delete ordersState.selected[id];
      });
      renderOrdersTable();
      updateBulkBar();
      updateNavCount();
    } catch (err) {
      wrap.innerHTML = '<div class="alert alert-error" style="margin:1rem;">' + esc(err.message) + '</div>';
    }
  }

  function renderOrdersTable() {
    var wrap = $('#orders-table');
    if (!ordersState.data.length) {
      wrap.innerHTML = '<div class="panel-body">' + emptyState('No orders match', 'Try changing the filters.') + '</div>';
      return;
    }
    var rows = ordersState.data.map(function (o) {
      var addr = (o.shipping_address && o.shipping_address.city) ? o.shipping_address.city : '';
      var sel = ordersState.selected[String(o.id)] ? ' selected' : '';
      return '<tr class="clickable' + sel + '" data-id="' + esc(o.id) + '">' +
        '<td class="check-col" onclick="event.stopPropagation()"><input type="checkbox" data-check="' + esc(o.id) + '"' +
        (sel ? ' checked' : '') + '></td>' +
        '<td><span class="order-id">' + orderLabel(o) + '</span>' + (o.tracking_number ? '<br><span class="muted" style="font-size:.72rem;">📦 ' + esc(o.tracking_number) + '</span>' : '') + '</td>' +
        '<td>' + fmtDate(o.created_at) + '</td>' +
        '<td><div class="strong">' + esc(o.customer_name || '—') + '</div><div class="muted" style="font-size:.76rem;">' + esc(o.customer_email || '') + '</div></td>' +
        '<td class="muted">' + esc(addr) + '</td>' +
        '<td class="num strong">' + money(o.total) + '</td>' +
        '<td>' + badge(o.status) + '</td>' +
        '<td>' + payBadge(o.payment_status || 'unpaid') + '</td>' +
        '</tr>';
    }).join('');
    var pages = Math.max(Math.ceil(ordersState.total / ordersState.perPage), 1);
    wrap.innerHTML =
      '<div class="table-wrap"><table class="orders"><thead><tr>' +
      '<th class="check-col"><input type="checkbox" id="check-all" aria-label="Select all on page"></th>' +
      '<th>Order</th><th>Date</th><th>Customer</th><th>City</th><th class="num">Total</th><th>Status</th><th>Payment</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="pagination">' +
      '<span>' + ordersState.total + ' order' + (ordersState.total === 1 ? '' : 's') + '</span>' +
      '<button id="pg-prev" class="btn btn-ghost btn-sm"' + (ordersState.page <= 1 ? ' disabled' : '') + '>← Prev</button>' +
      '<span>Page ' + ordersState.page + ' of ' + pages + '</span>' +
      '<button id="pg-next" class="btn btn-ghost btn-sm"' + (ordersState.page >= pages ? ' disabled' : '') + '>Next →</button>' +
      '</div>';

    // row click → drawer
    $$('#orders-table tbody tr[data-id]').forEach(function (tr) {
      tr.addEventListener('click', function () { openOrder(tr.getAttribute('data-id')); });
    });
    // checkbox clicks
    $$('#orders-table [data-check]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-check');
        if (cb.checked) ordersState.selected[id] = true; else delete ordersState.selected[id];
        cb.closest('tr').classList.toggle('selected', cb.checked);
        updateBulkBar();
      });
    });
    var all = $('#check-all');
    if (all) {
      all.addEventListener('change', function () {
        var checked = all.checked;
        ordersState.data.forEach(function (o) {
          if (checked) ordersState.selected[String(o.id)] = true; else delete ordersState.selected[String(o.id)];
        });
        $$('#orders-table [data-check]').forEach(function (cb) { cb.checked = checked; cb.closest('tr').classList.toggle('selected', checked); });
        updateBulkBar();
      });
    }
    var prev = $('#pg-prev');
    if (prev) prev.addEventListener('click', function () { ordersState.page--; ordersState.selected = {}; loadOrders(); });
    var next = $('#pg-next');
    if (next) next.addEventListener('click', function () { ordersState.page++; ordersState.selected = {}; loadOrders(); });
  }

  function selectedIds() {
    return Object.keys(ordersState.selected);
  }

  function updateBulkBar() {
    var bar = $('#bulk-bar');
    var ids = selectedIds();
    if (!bar) return;
    if (!ids.length) { bar.innerHTML = ''; return; }
    bar.innerHTML =
      '<span>' + ids.length + ' selected</span>' +
      '<select id="bulk-status" aria-label="Set status">' +
      '<option value="">Set status…</option>' +
      STATUSES.filter(function (s) { return s !== 'paid'; }).map(function (s) {
        return '<option value="' + s + '">' + STATUS_LABELS[s] + '</option>';
      }).join('') + '</select>' +
      '<select id="bulk-pay" aria-label="Set payment">' +
      '<option value="">Set payment…</option>' +
      PAYMENTS.map(function (p) {
        return '<option value="' + p + '">' + PAYMENT_LABELS[p] + '</option>';
      }).join('') + '</select>' +
      '<button id="bulk-apply" class="btn btn-sm btn-primary">Apply</button>' +
      '<button id="bulk-complete" class="btn btn-sm btn-ghost">Mark Completed</button>' +
      '<button id="bulk-clear" class="btn btn-sm btn-ghost" style="margin-left:auto;">Clear</button>';
    $('#bulk-clear').addEventListener('click', function () {
      ordersState.selected = {};
      $$('#orders-table [data-check]').forEach(function (cb) { cb.checked = false; cb.closest('tr').classList.remove('selected'); });
      var all = $('#check-all'); if (all) all.checked = false;
      updateBulkBar();
    });
    $('#bulk-apply').addEventListener('click', function () {
      var status = $('#bulk-status').value;
      var pay = $('#bulk-pay').value;
      if (!status && !pay) { toast('Pick a status or payment action first.', 'err'); return; }
      bulkUpdate(status, pay);
    });
    $('#bulk-complete').addEventListener('click', function () { bulkUpdate('completed', ''); });
  }

  async function bulkUpdate(status, pay) {
    try {
      var data = await api('/orders/bulk', {
        method: 'POST',
        body: JSON.stringify({ ids: selectedIds(), status: status, payment_status: pay })
      });
      toast(data.updated + ' order' + (data.updated === 1 ? '' : 's') + ' updated', 'ok');
      ordersState.selected = {};
      await loadOrders();
      updateNavCount();
    } catch (err) {
      toast(err.message, 'err');
    }
  }

  async function updateNavCount() {
    try {
      var s = await api('/stats');
      var el = $('#nav-order-count');
      el.textContent = String(s.kpis.activeOrders);
      el.hidden = s.kpis.activeOrders === 0;
    } catch (e) { /* non-fatal */ }
  }

  function exportCSV() {
    var params = new URLSearchParams();
    if (ordersState.q) params.set('q', ordersState.q);
    if (ordersState.status) params.set('status', ordersState.status);
    if (ordersState.payment) params.set('payment', ordersState.payment);
    if (ordersState.from) params.set('from', ordersState.from);
    if (ordersState.to) params.set('to', ordersState.to);
    var qs = params.toString();
    fetch(API + '/export' + (qs ? '?' + qs : ''), {
      headers: { 'Authorization': 'Bearer ' + token() }
    }).then(function (res) {
      if (!res.ok) throw new Error('Export failed');
      return res.blob();
    }).then(function (blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'orders-' + new Date().toISOString().slice(0, 10) + '.csv';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 400);
      toast('CSV downloaded', 'ok');
    }).catch(function (err) { toast(err.message, 'err'); });
  }

  // ── Order drawer ────────────────────────────────────────────────────────

  var drawer = $('#drawer');
  var drawerBackdrop = $('#drawer-backdrop');
  var currentOrderId = null;

  window.__openOrder = function (id) { openOrder(id); };

  function closeDrawer() {
    drawer.hidden = true;
    drawerBackdrop.hidden = true;
    currentOrderId = null;
  }
  drawerBackdrop.addEventListener('click', closeDrawer);

  async function openOrder(id) {
    currentOrderId = String(id);
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    drawer.innerHTML =
      '<div class="drawer-head"><h2 id="drawer-head-title">Order #' + esc(id) + '</h2><button class="drawer-close" onclick="window.__closeDrawer()">×</button></div>' +
      '<div id="drawer-body" class="drawer-body"><div class="loading"><span class="spinner"></span>Loading order…</div></div>';
    window.__closeDrawer = closeDrawer;
    var body = $('#drawer-body');

    try {
      var data = await api('/orders/' + encodeURIComponent(id));
      var title = $('#drawer-head-title');
      if (title) title.textContent = 'Order ' + orderLabel(data.order || {});
      renderDrawer(data.order, data.items);
    } catch (err) {
      body.innerHTML = '<div class="alert alert-error">' + esc(err.message) + '</div>';
    }
  }

  function renderDrawer(o, items) {
    var body = $('#drawer-body');
    var addr = o.shipping_address || {};
    var remaining = Math.max((Number(o.total) || 0) - (Number(o.refunded_amount) || 0), 0);
    var itemsHTML = items && items.length ? items.map(function (it) {
      var props = it.properties || {};
      var img = props._image ? '<img class="item-thumb" src="' + esc(props._image) + '" alt="" onerror="this.style.display=\'none\'">' : '';
      var meta = [];
      Object.keys(props).forEach(function (k) {
        if (k === '_image') return;
        meta.push(esc(k) + ': ' + esc(props[k]));
      });
      return '<div class="item-line">' + img +
        '<div class="item-info"><div class="n" title="' + esc(it.product_name) + '">' + esc(it.product_name || it.product_slug) + '</div>' +
        (meta.length ? '<div class="s">' + meta.join(' · ') + '</div>' : '') + '</div>' +
        '<span class="item-qty">×' + (it.quantity || 1) + '</span>' +
        '<span class="item-price">' + money((Number(it.unit_price) || 0) * (Number(it.quantity) || 1)) + '</span></div>';
    }).join('') : '<div class="muted">No line items recorded.</div>';

    var statusOptions = STATUSES.map(function (s) {
      return '<option value="' + s + '"' + (o.status === s ? ' selected' : '') + '>' + STATUS_LABELS[s] + '</option>';
    }).join('');
    var payOptions = PAYMENTS.map(function (p) {
      return '<option value="' + p + '"' + ((o.payment_status || 'unpaid') === p ? ' selected' : '') + '>' + PAYMENT_LABELS[p] + '</option>';
    }).join('');

    body.innerHTML =
      '<div class="d-section"><div class="d-kv"><dt>Placed</dt><dd>' + fmtDateTime(o.created_at) + '</dd></div>' +
      '<div class="d-kv"><dt>Status</dt><dd>' + badge(o.status) + ' ' + payBadge(o.payment_status || 'unpaid') + '</dd></div>' +
      '<div class="d-kv"><dt>Total</dt><dd class="strong">' + money(o.total) + '</dd></div>' +
      (Number(o.refunded_amount) ? '<div class="d-kv"><dt>Refunded</dt><dd style="color:#dc2626;">' + money(o.refunded_amount) + '</dd></div>' : '') +
      (o.payment_intent_id ? '<div class="d-kv"><dt>Stripe intent</dt><dd class="order-id" style="font-size:.72rem;">' + esc(o.payment_intent_id) + '</dd></div>' : '') +
      '</div>' +

      '<div class="d-section"><h3>Status actions</h3><div class="status-actions">' +
      '<button class="btn btn-sm btn-primary" data-action="shipped" ' + (o.status === 'shipped' || o.status === 'completed' || o.status === 'cancelled' ? 'disabled' : '') + '>📦 Mark Shipped</button>' +
      '<button class="btn btn-sm btn-primary" data-action="completed" ' + (o.status === 'completed' || o.status === 'cancelled' ? 'disabled' : '') + '>✓ Mark Completed</button>' +
      '<button class="btn btn-sm btn-danger" data-action="cancelled" ' + (o.status === 'cancelled' ? 'disabled' : '') + '>✕ Cancel</button>' +
      '</div><div class="field-row">' +
      '<div class="field"><label>Fulfillment status</label><select id="d-status">' + statusOptions + '</select></div>' +
      '<div class="field"><label>Payment status</label><select id="d-pay">' + payOptions + '</select></div></div>' +
      '<div class="field-row">' +
      '<div class="field"><label>Tracking number</label><input id="d-tracking" type="text" value="' + esc(o.tracking_number || '') + '" placeholder="e.g. 9400111899223848373661"></div>' +
      '<div class="field"><label>Tracking URL</label><input id="d-tracking-url" type="text" value="' + esc(o.tracking_url || '') + '" placeholder="https://…"></div></div>' +
      '<div class="field"><label>Refund</label><button id="d-refund" class="btn btn-danger btn-sm" ' + (remaining <= 0 ? 'disabled' : '') + '>↩ Refund ' + money(remaining) + '</button></div>' +
      '<button id="d-save" class="btn btn-primary btn-sm" style="margin-top:.6rem;">Save Changes</button></div>' +

      '<div class="d-section"><h3>Items</h3>' + itemsHTML + '</div>' +

      '<div class="d-section"><h3>Customer</h3>' +
      '<div class="d-kv"><dt>Name</dt><dd>' + esc(o.customer_name || '—') + '</dd></div>' +
      '<div class="d-kv"><dt>Email</dt><dd><a href="mailto:' + esc(o.customer_email) + '">' + esc(o.customer_email || '—') + '</a></dd></div>' +
      '<div class="d-kv"><dt>Phone</dt><dd>' + esc(o.customer_phone || '—') + '</dd></div>' +
      '<div class="d-kv"><dt>Session</dt><dd class="order-id" style="font-size:.72rem;">' + esc(o.session_id || '—') + '</dd></div>' +
      '</div>' +

      '<div class="d-section"><h3>Shipping Address</h3><div class="d-addr">' +
      (addr.street ? esc(addr.street) + '<br>' : '') +
      (addr.city ? esc(addr.city) + (addr.state ? ', ' + esc(addr.state) : '') : '') +
      (addr.zip ? ' ' + esc(addr.zip) : '') +
      (addr.country ? '<br>' + esc(addr.country) : '') +
      (!addr.street && !addr.city ? '<span class="muted">No address recorded.</span>' : '') +
      '</div></div>' +

      (o.notes ? '<div class="d-section"><h3>Customer Notes</h3><div class="d-addr">' + esc(o.notes) + '</div></div>' : '') +

      '<div class="d-section"><h3>Admin Notes</h3>' +
      '<textarea id="d-notes" rows="3" style="width:100%;padding:.55rem .7rem;border:1px solid #d1d5db;border-radius:8px;font-family:inherit;font-size:.875rem;">' + esc(o.admin_notes || '') + '</textarea></div>';

    wireDrawer(o);
  }

  function wireDrawer(o) {
    var saveBtn = $('#d-save');
    var doSave = async function () {
      var patch = {
        status: $('#d-status').value,
        payment_status: $('#d-pay').value,
        tracking_number: $('#d-tracking').value.trim(),
        tracking_url: $('#d-tracking-url').value.trim(),
        admin_notes: $('#d-notes').value
      };
      try {
        await api('/orders/' + encodeURIComponent(currentOrderId), { method: 'PATCH', body: JSON.stringify(patch) });
        toast('Order updated', 'ok');
        openOrder(currentOrderId);           // re-render with fresh data
        await loadOrdersIfVisible();
        updateNavCount();
      } catch (err) { toast(err.message, 'err'); }
    };
    saveBtn.addEventListener('click', doSave);

    $$('#drawer-body [data-action]').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        var status = btn.getAttribute('data-action');
        try {
          await api('/orders/' + encodeURIComponent(currentOrderId), {
            method: 'PATCH', body: JSON.stringify({ status: status })
          });
          toast('Order marked ' + (STATUS_LABELS[status] || status), 'ok');
          openOrder(currentOrderId);
          await loadOrdersIfVisible();
          updateNavCount();
        } catch (err) { toast(err.message, 'err'); }
      });
    });

    var refundBtn = $('#d-refund');
    if (refundBtn) refundBtn.addEventListener('click', function () {
      openRefundModal(o);
    });
  }

  async function loadOrdersIfVisible() {
    if (currentRoute() === 'orders' && $('#orders-table')) await loadOrders();
  }

  // ── Refund modal ────────────────────────────────────────────────────────

  function openRefundModal(o) {
    var remaining = Math.max((Number(o.total) || 0) - (Number(o.refunded_amount) || 0), 0);
    var backdrop = $('#modal-backdrop');
    var body = $('#modal-body');
    body.innerHTML =
      '<h2>Refund Order ' + orderLabel(o) + '</h2>' +
      '<p class="m-sub">Refund goes back to the customer via Stripe. Current balance: <strong>' + money(remaining) + '</strong></p>' +
      '<div class="field"><label>Amount ($)</label><input id="refund-amount" type="number" min="0.01" step="0.01" value="' + remaining.toFixed(2) + '"></div>' +
      '<div class="field"><label>Reason</label><select id="refund-reason">' +
      '<option value="requested_by_customer">Requested by customer</option>' +
      '<option value="duplicate">Duplicate</option>' +
      '<option value="fraudulent">Fraudulent</option>' +
      '</select></div>' +
      '<div class="modal-actions">' +
      '<button id="refund-cancel" class="btn btn-ghost">Cancel</button>' +
      '<button id="refund-confirm" class="btn btn-danger">Confirm Refund</button></div>';
    backdrop.hidden = false;

    $('#refund-cancel').addEventListener('click', function () { backdrop.hidden = true; });
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) backdrop.hidden = true; });

    $('#refund-confirm').addEventListener('click', async function () {
      var amount = parseFloat($('#refund-amount').value);
      var reason = $('#refund-reason').value;
      if (!(amount > 0)) { toast('Enter a valid amount.', 'err'); return; }
      var btn = $('#refund-confirm');
      btn.disabled = true; btn.textContent = 'Processing…';
      try {
        var data = await api('/orders/' + encodeURIComponent(o.id) + '/refund', {
          method: 'POST', body: JSON.stringify({ amount: amount, reason: reason })
        });
        toast('Refunded ' + money(data.amount) + ' (' + data.refundId + ')', 'ok');
        backdrop.hidden = true;
        openOrder(o.id);
        await loadOrdersIfVisible();
        updateNavCount();
      } catch (err) {
        toast(err.message, 'err');
        btn.disabled = false; btn.textContent = 'Confirm Refund';
      }
    });
  }

  // ── Reports ─────────────────────────────────────────────────────────────

  async function renderReports() {
    var view = $('#view');
    $('#page-title').textContent = 'Reports';
    $('#page-sub').textContent = 'Reporting dashboard — exports and breakdowns';
    view.innerHTML = loading('Building report…');
    try {
      var s = await api('/stats');
      setPageSub(s);
      view.innerHTML = reportsHTML(s);
      $('#nav-order-count').textContent = String(s.kpis.activeOrders);
      $('#nav-order-count').hidden = false;
      wireReports(s);
    } catch (err) {
      view.innerHTML = '<div class="alert alert-error" style="max-width:640px;margin:2rem auto;">' + esc(err.message) + '</div>';
    }
  }

  function breakdownTable(title, rows, isPayment) {
    var totalRev = rows.reduce(function (sum, r) { return sum + r.revenue; }, 0);
    var body = rows.filter(function (r) { return r.count > 0; }).map(function (r) {
      var label = isPayment ? (PAYMENT_LABELS[r.status] || r.status) : (STATUS_LABELS[r.status] || r.status);
      return '<tr><td>' + (isPayment ? payBadge(r.status) : badge(r.status)) + '</td>' +
        '<td class="num">' + r.count + '</td>' +
        '<td class="num strong">' + money(r.revenue) + '</td>' +
        '<td class="num muted">' + (totalRev ? Math.round(r.revenue / totalRev * 100) : 0) + '%</td></tr>';
    }).join('');
    return '<div class="panel"><div class="panel-head"><h2>' + esc(title) + '</h2></div>' +
      '<div class="panel-body"><table class="report-table"><thead><tr>' +
      '<th>Status</th><th class="num">Orders</th><th class="num">Revenue</th><th class="num">% of Revenue</th></tr></thead>' +
      '<tbody>' + (body || '<tr><td colspan="4" class="muted">No data.</td></tr>') + '</tbody></table></div></div>';
  }

  function reportsHTML(s) {
    var html = '<div class="kpi-grid">' +
      kpiCard('Gross Revenue', money(s.kpis.grossRevenue), 'Before refunds') +
      kpiCard('Net Revenue', money(s.kpis.netRevenue), 'After ' + money(s.kpis.refundAmount) + ' refunds', 'up') +
      kpiCard('Orders', String(s.kpis.orders), 'AOV ' + money(s.kpis.aov)) +
      kpiCard('Refund Rate', s.kpis.orders ? Math.round(s.kpis.refundCount / s.kpis.orders * 100) + '%' : '—', s.kpis.refundCount + ' order' + (s.kpis.refundCount === 1 ? '' : 's') + ' refunded', s.kpis.refundCount ? 'danger' : '') +
      '</div>';

    html += '<div class="report-grid">' +
      breakdownTable('Orders by Status', s.statusBreakdown, false) +
      breakdownTable('Orders by Payment Status', s.paymentBreakdown, true) +
      '</div>';

    html += '<div class="panel"><div class="panel-head"><h2>Top Products</h2>' +
      '<button id="rep-export" class="btn btn-sm btn-ghost">⤓ Export Orders CSV</button></div>' +
      '<div class="panel-body"><div class="table-wrap"><table class="report-table"><thead><tr>' +
      '<th>#</th><th>Product</th><th class="num">Units Sold</th><th class="num">Revenue</th></tr></thead><tbody>' +
      s.topProducts.map(function (p, i) {
        return '<tr><td>' + (i + 1) + '</td><td class="strong">' + esc(p.name) + '</td>' +
          '<td class="num">' + p.quantity + '</td><td class="num strong">' + money(p.revenue) + '</td></tr>';
      }).join('') +
      '</tbody></table></div></div></div>';

    html += '<div class="panel"><div class="panel-head"><h2>Daily Revenue — Last 30 Days</h2></div>' +
      '<div class="panel-body">' + barsChart(s.daily) + '</div></div>';

    return html;
  }

  function wireReports(s) {
    $('#rep-export').addEventListener('click', function () {
      ordersState.status = 'all';
      ordersState.q = ''; ordersState.payment = ''; ordersState.from = ''; ordersState.to = '';
      exportCSV();
    });
  }

  // ── Boot ────────────────────────────────────────────────────────────────

  (async function boot() {
    if (await verifySession()) return;
    showLogin();
  })();
}());
