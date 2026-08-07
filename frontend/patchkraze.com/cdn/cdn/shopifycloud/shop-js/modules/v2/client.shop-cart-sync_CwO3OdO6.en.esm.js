import {
    _ as r
} from "./chunk.casing_CQY6ZJfx.esm.js";
import {
    c as e,
    u as n,
    q as o,
    r as s,
    b as t,
    j as i,
    R as a,
    A as c,
    a as u,
    y as m,
    T as h
} from "./chunk.index_DqGc8uuP.esm.js";
import {
    P as l
} from "./chunk.authorize_oZ0RluMR.esm.js";
import {
    i as _
} from "./chunk.window_BV7pwtSs.esm.js";
import {
    u as d
} from "./chunk.useEventListener_B3l3y7v1.esm.js";
import {
    u as p
} from "./chunk.useUserRecognitionSignal_DE54QHEj.esm.js";
import "./chunk.preact-module_Cvpcobqs.esm.js";
import "./chunk.errors_DHmiSMJ3.esm.js";
import "./chunk.v4_CSBSzmbm.esm.js";
import "./chunk.document_C9LmOiQj.esm.js";
import "./chunk.hooks_-opTOImp.esm.js";
import "./chunk.validators_Cj2qrO-d.esm.js";

function f({
    source: r
}) {
    const {
        notify: s
    } = e(), {
        recordCounter: t,
        recordHistogram: i
    } = n(), a = p(), c = o((r => {
        if ("completed" === r.type) {
            t("shop_js_cart_sync_finalize_fetch");
            const r = Date.now();
            ! function({
                onError: r,
                onResolve: e
            }) {
                fetch(`${_.location.origin}/services/login_with_shop/buyer/finalize`).then((r => e(r.status))).catch((e => r(e)))
            }({
                onError: r => {
                    const e = function(r) {
                        if (r instanceof Error) return r;
                        switch (typeof r) {
                            case "string":
                                return new Error(r);
                            case "object":
                                return "message" in r ? new Error(r.message) : new Error(JSON.stringify(r));
                            default:
                                return new Error(String(r))
                        }
                    }(r);
                    t("shop_js_cart_sync_finalize_error"), s(e)
                },
                onResolve: e => {
                    i("shop_js_fetch_duration", {
                        attributes: {
                            action: "shop_user_recognition_finalize"
                        },
                        value: Date.now() - r
                    }), t("shop_js_cart_sync_finalize_resolve", {
                        attributes: {
                            status: e
                        }
                    }), 200 === e && a({
                        recognized: !0
                    })
                }
            })
        }
    }), [a, s, t, i]), {
        destroy: u
    } = d({
        allowedOrigins: [l, _.location.origin],
        handler: c,
        source: r
    });
    return {
        destroy: u
    }
}
const y = ({
    ctx: r
}) => {
    const {
        log: e
    } = n(), o = c(null), {
        instanceId: s
    } = u(), {
        destroy: i
    } = f({
        source: o
    });
    m((() => {
        const r = o.current;
        return () => {
            r && i()
        }
    }), [i]);
    const a = h((() => {
        var n, o;
        const t = _.location.origin,
            i = null === (n = _.Shopify) || void 0 === n ? void 0 : n.shop;
        if (!i) return e({
            body: "Missing Shopify domain from window.Shopify",
            attributes: {
                analyticsTraceId: s,
                domain: _.location.origin
            }
        }), "";
        if (null === (o = _.Shopify) || void 0 === o ? void 0 : o.designMode) return "";
        const a = new URLSearchParams({
            analytics_trace_id: s,
            target_origin: t,
            client_handle: i
        });
        r && a.set("ctx", r);
        return `${l}/pay/hop?${a}`
    }), [r, s, e]);
    return t("iframe", {
        "aria-hidden": "true",
        "data-testid": "shop-cart-sync-iframe",
        ref: o,
        src: a,
        style: {
            display: "none"
        },
        tabIndex: -1,
        title: "Shop Pay cart sync"
    })
};
s((e => {
    var {
        element: n
    } = e, o = r(e, ["element"]);
    return t(a, {
        element: n,
        featureName: "ShopCartSync",
        children: t(i, {
            children: t(y, Object.assign({}, o))
        })
    })
}), {
    name: "shop-cart-sync",
    props: {
        ctx: "string"
    },
    shadow: "open"
});
//# sourceMappingURL=client.shop-cart-sync_CwO3OdO6.en.esm.js.map