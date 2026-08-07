---
kind: frontend_style
name: Shopify Dawn Theme with CSS Custom Properties and Vanilla JS Overrides
category: frontend_style
scope:
    - '**'
source_files:
    - frontend/cdn/shop/t/38/assets/base.css
    - frontend/cdn/shop/t/38/assets/overflow-list.css
    - frontend/cdn/shop/t/38/compiled_assets/styles.css
    - frontend/js/patchbyte.js
    - frontend/package.json
---

## What system/approach is used

The frontend styling is built on the **Shopify Dawn theme** (theme ID `38`), a modern Shopify theme that uses:

- **CSS custom properties (CSS variables)** as the primary design-token system — colors, spacing, typography, hover effects, and layout tokens are all exposed via `--color-*`, `--gap-*`, `--font-*`, `--hover-*`, `--layer-*`, etc. variables defined in `:root` and component-scoped.
- **Vanilla CSS** (no Sass/Less/PostCSS pipeline in this repo) — styles live in `frontend/cdn/shop/t/38/assets/base.css` (the main stylesheet, ~3700 lines) and `overflow-list.css` (a Web Component stylesheet for an overflow list component).
- A **compiled stylesheet** at `frontend/cdn/shop/t/38/compiled_assets/styles.css` (~14k lines) which contains the compiled output of Dawn's section/component CSS (e.g., `collection-links-component`, `featured-product-section`, `.utilities`).
- **No CSS framework** (no Tailwind, Bootstrap, etc.) — no references to `tailwind.config.*`, PostCSS, or stylelint were found in any package manifests.
- **Web Components / Custom Elements** — the theme uses custom elements like `<collection-links-component>`, `<slideshow-component>`, `<cart-icon>` and a shadow DOM-based `overflow-list` component (`overflow-list.css` uses `:host`, `[part=...]`, `<slot name="more">`).
- **Responsive strategy**: mobile-first breakpoints at `749px` / `750px` (Dawn's standard breakpoint), using `@media(max-width:749px)` and `@media(min-width:750px)` throughout.
- **A single client-side override script** injected into every page: `frontend/js/patchbyte.js` — it does not contain styling but manipulates DOM classes like `.hidden`, `.visually-hidden`, `.cart-bubble__text-count`, `.cart-bubble` to drive cart badge visibility.

## Key files and packages

- `frontend/cdn/shop/t/38/assets/base.css` — root stylesheet defining CSS variables, resets, card hover effects, dialog defaults, typography wrapping, and global utilities.
- `frontend/cdn/shop/t/38/assets/overflow-list.css` — scoped stylesheet for the `overflow-list` Web Component (uses Shadow DOM parts/slots).
- `frontend/cdn/shop/t/38/compiled_assets/styles.css` — compiled Dawn section/component CSS (product grids, collection links, utilities, media blocks).
- `frontend/js/patchbyte.js` — injected client-side script that drives cart/contact behavior by toggling existing CSS classes; it assumes class names from the Dawn theme (`.cart-bubble`, `.contact-form__form`, `.product__title`, etc.).
- `frontend/package.json` — only declares runtime dependencies (`express`, `stripe`, `dotenv`); no build tooling or CSS tooling.

## Architecture and conventions

- **Design tokens via CSS variables**: All visual values flow through `:root` variables (e.g., `--color-foreground`, `--color-background`, `--style-border-radius-inputs`, `--hover-lift-amount`, `--gap-*`, `--font-paragraph-family`). This is the single source of truth for theming.
- **Component-style naming**: The compiled CSS targets both traditional classes (`.product-card`, `.collection-card`, `.resource-card`) and custom element attributes (`collection-links-component[layout=spotlight]`, `collection-links-component[alignment=center]`), following Dawn's pattern of combining BEM-like classes with attribute-driven variants.
- **Hover/motion tokens**: Hover behaviors are parameterized via `--hover-lift-amount`, `--hover-scale-amount`, `--hover-subtle-zoom-amount`, `--hover-shadow-color`, `--hover-transition-duration`, `--hover-transition-timing`, enabling consistent micro-interactions across cards.
- **Mobile-first responsive**: Breakpoints consistently use `749px` / `750px`; fluid spacing uses `clamp(var(--gap-xs), 1vw, var(--gap-xl))` patterns.
- **Reduced motion support**: Card hover effects are gated behind `@media(any-pointer:fine)and (prefers-reduced-motion:no-preference)` so animations are disabled for users who prefer reduced motion.
- **Scrollbar customization**: Global scrollbar styling via `scrollbar-width: thin` and `scrollbar-color` using CSS variable RGB components.
- **Image/media defaults**: `img, picture, video, canvas, svg { display: block; max-width: 100% }` ensures responsive media out of the box.
- **Text handling**: `overflow-wrap: break-word` on headings and a `.wrap-text` utility for controlled text breaking.
- **Shadow DOM components**: The `overflow-list` component encapsulates its own styles via `:host`, `[part=list]`, `[part=overflow-list]`, `[part=placeholder]`, and `<slot name="more">`, keeping its styling isolated from global CSS.

## Conventions and constraints

- **No preprocessor/build step**: The repo has no Sass, Less, PostCSS, or Tailwind configuration; styles are plain CSS shipped directly. Any compilation happens outside this repo (the Dawn theme's own build process produces `compiled_assets/styles.css`).
- **Theme overrides go through CSS variables**: To re-theme, modify `:root` variables rather than overriding individual rules — this is the established convention in `base.css`.
- **Class names must match Dawn conventions**: The injected `patchbyte.js` script selects elements using Dawn-specific selectors (`.cart-bubble`, `.cart-bubble__text-count`, `.contact-form__form`, `.product__title`, `.product__media img`, `.media-gallery__media img`, `[data-cart-count]`). Changing these class names would break the cart/contact integration.
- **Breakpoint discipline**: Responsive rules consistently use Dawn's `749px`/`750px` boundary; introducing new breakpoints should follow this pattern.
- **Motion is opt-out via prefers-reduced-motion**: Animations are wrapped in `@media(...prefers-reduced-motion:no-preference)` blocks — new animations should follow this guard.
- **Custom elements use attribute-driven variants**: Section components (like `collection-links-component`) expose variants via HTML attributes (`layout=`, `alignment=`, `reverse`, `ratio=`) rather than separate classes, matching Dawn's approach.