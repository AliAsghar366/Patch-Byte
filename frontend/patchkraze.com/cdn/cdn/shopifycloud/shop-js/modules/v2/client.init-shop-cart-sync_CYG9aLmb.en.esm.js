import "./client.shop-cart-sync_CwO3OdO6.en.esm.js";
import {
    d as t
} from "./chunk.defineInitFunction_D4of-Jj4.esm.js";
import {
    a as e
} from "./chunk.casing_CQY6ZJfx.esm.js";
import {
    B as n,
    g as i
} from "./chunk.index_DqGc8uuP.esm.js";
import {
    i as r
} from "./chunk.errors_DHmiSMJ3.esm.js";
import {
    i as s
} from "./chunk.document_C9LmOiQj.esm.js";
import "./chunk.authorize_oZ0RluMR.esm.js";
import "./chunk.window_BV7pwtSs.esm.js";
import "./chunk.useEventListener_B3l3y7v1.esm.js";
import "./chunk.hooks_-opTOImp.esm.js";
import "./chunk.validators_Cj2qrO-d.esm.js";
import "./chunk.useUserRecognitionSignal_DE54QHEj.esm.js";
import "./chunk.preact-module_Cvpcobqs.esm.js";
import "./chunk.v4_CSBSzmbm.esm.js";

function o() {
    return e(this, void 0, void 0, (function*() {
        if (c()) return !1;
        if ("userAgentData" in r && r.userAgentData) try {
            const t = r.userAgentData.brands || [];
            return t.some((({
                brand: t
            }) => /chrome|edge|chromium/i.test(t)))
        } catch (t) {}
        return !(void 0 === r || !r.userAgent) && function() {
            const t = r.userAgent;
            if (c()) return !1;
            const e = /(chrome|crios)\/([\w.]+)/i.test(t),
                n = /(edg|edge|edga|edgios)\/([\w.]+)/i.test(t),
                i = /(opr|opera|brave|vivaldi)\/([\w.]+)/i.test(t);
            return (e || n) && !i
        }()
    }))
}

function c() {
    const t = r.userAgent;
    return /iphone|ipad|ipod|crios|edgios/i.test(t)
}

function u(t) {
    return e(this, void 0, void 0, (function*() {
        const e = new n("initShopCartSync");
        try {
            let e, n = !1;
            if (!(yield o())) return;
            e = s.querySelector("shop-cart-sync"), e || (e = i("shop-cart-sync"), n = !0), e.setAttribute("experiments", JSON.stringify((null == t ? void 0 : t.experiments) || {})), (null == t ? void 0 : t.ctx) && e.setAttribute("ctx", t.ctx), n && s.body.appendChild(e)
        } catch (t) {
            t instanceof Error && e.notify(t)
        }
    }))
}
t("initShopCartSync", u);
//# sourceMappingURL=client.init-shop-cart-sync_CYG9aLmb.en.esm.js.map