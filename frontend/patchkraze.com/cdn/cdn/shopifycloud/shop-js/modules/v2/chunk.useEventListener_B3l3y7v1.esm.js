import {
    a as e
} from "./chunk.casing_CQY6ZJfx.esm.js";
import {
    T as n,
    y as t,
    q as r
} from "./chunk.index_DqGc8uuP.esm.js";
import {
    u as o
} from "./chunk.hooks_-opTOImp.esm.js";
import {
    A as s
} from "./chunk.errors_DHmiSMJ3.esm.js";
import {
    a as i
} from "./chunk.validators_Cj2qrO-d.esm.js";
import {
    i as a
} from "./chunk.window_BV7pwtSs.esm.js";

function d({
    allowedOrigins: d,
    destination: c = a,
    handler: m,
    source: u
}) {
    const {
        trackPostMessageTransmission: l
    } = o(), v = n((() => new Set), []);
    t((() => (v.add(m), () => {
        v.delete(m)
    })), [m, v]), t((() => {
        const e = e => function(e) {
            return "object" == typeof e && null !== e && "messageId" in e && "type" in e
        }(e) && l({
            direction: "incoming",
            event: e
        });
        return v.add(e), () => {
            v.delete(e)
        }
    }), [l, v]);
    const f = r((e => {
            v.forEach((n => n(e)))
        }), [v]),
        g = r((e => {
            const n = u.current instanceof HTMLIFrameElement ? u.current.contentWindow : u.current;
            i({
                allowedOrigins: d,
                event: e,
                source: n
            }) && f(e.data)
        }), [d, f, u]),
        p = r((() => {
            c.removeEventListener("message", g, !1)
        }), [c, g]);
    t((() => (c.addEventListener("message", g, !1), () => {
        p()
    })), [c, p, g]);
    const h = r(((n, t) => e(this, void 0, void 0, (function*() {
        let e;
        try {
            return yield new Promise(((r, o) => {
                function i() {
                    o(new s("Abort signal received", "AbortSignalReceivedError"))
                }(null == t ? void 0 : t.aborted) && i(), e = e => {
                    e.type === n && (null == t || t.removeEventListener("abort", i), r(e))
                }, v.add(e), null == t || t.addEventListener("abort", i)
            }))
        } finally {
            e && v.delete(e)
        }
    }))), [v]);
    return {
        destroy: p,
        waitForMessage: h
    }
}
export {
    d as u
};
//# sourceMappingURL=chunk.useEventListener_B3l3y7v1.esm.js.map