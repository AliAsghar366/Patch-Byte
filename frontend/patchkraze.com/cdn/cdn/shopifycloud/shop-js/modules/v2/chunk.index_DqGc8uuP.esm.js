import {
    l as t,
    Q as e,
    k as o,
    K as n,
    G as r,
    _ as i
} from "./chunk.preact-module_Cvpcobqs.esm.js";
import {
    i as a,
    A as s
} from "./chunk.errors_DHmiSMJ3.esm.js";
import {
    b as c,
    a as l,
    c as d,
    d as u,
    _ as p
} from "./chunk.casing_CQY6ZJfx.esm.js";
import {
    i as h
} from "./chunk.window_BV7pwtSs.esm.js";
import {
    i as f
} from "./chunk.document_C9LmOiQj.esm.js";
import {
    v as g
} from "./chunk.v4_CSBSzmbm.esm.js";
var m = 0;

function v(e, o, n, r, i, a) {
    o || (o = {});
    var s, c, l = o;
    if ("ref" in l)
        for (c in l = {}, o) "ref" == c ? s = o[c] : l[c] = o[c];
    var d = {
        type: e,
        props: l,
        key: n,
        ref: s,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __c: null,
        constructor: void 0,
        __v: --m,
        __i: -1,
        __u: 0,
        __source: i,
        __self: a
    };
    if ("function" == typeof e && (s = e.defaultProps))
        for (c in s) void 0 === l[c] && (l[c] = s[c]);
    return t.vnode && t.vnode(d), d
}
var w, y, b, x, _ = 0,
    k = [],
    E = t,
    S = E.__b,
    M = E.__r,
    P = E.diffed,
    O = E.__c,
    C = E.unmount,
    j = E.__;

function T(t, e) {
    E.__h && E.__h(y, t, _ || e), _ = 0;
    var o = y.__H || (y.__H = {
        __: [],
        __h: []
    });
    return t >= o.__.length && o.__.push({}), o.__[t]
}

function I(t) {
    return _ = 1, A(X, t)
}

function A(t, e, o) {
    var n = T(w++, 2);
    if (n.t = t, !n.__c && (n.__ = [o ? o(e) : X(void 0, e), function(t) {
            var e = n.__N ? n.__N[0] : n.__[0],
                o = n.t(e, t);
            e !== o && (n.__N = [o, n.__[1]], n.__c.setState({}))
        }], n.__c = y, !y.__f)) {
        var r = function(t, e, o) {
            if (!n.__c.__H) return !0;
            var r = n.__c.__H.__.filter((function(t) {
                return !!t.__c
            }));
            if (r.every((function(t) {
                    return !t.__N
                }))) return !i || i.call(this, t, e, o);
            var a = n.__c.props !== t;
            return r.forEach((function(t) {
                if (t.__N) {
                    var e = t.__[0];
                    t.__ = t.__N, t.__N = void 0, e !== t.__[0] && (a = !0)
                }
            })), i && i.call(this, t, e, o) || a
        };
        y.__f = !0;
        var i = y.shouldComponentUpdate,
            a = y.componentWillUpdate;
        y.componentWillUpdate = function(t, e, o) {
            if (this.__e) {
                var n = i;
                i = void 0, r(t, e, o), i = n
            }
            a && a.call(this, t, e, o)
        }, y.shouldComponentUpdate = r
    }
    return n.__N || n.__
}

function N(t, e) {
    var o = T(w++, 3);
    !E.__s && K(o.__H, e) && (o.__ = t, o.u = e, y.__H.__h.push(o))
}

function z(t, e) {
    var o = T(w++, 4);
    !E.__s && K(o.__H, e) && (o.__ = t, o.u = e, y.__h.push(o))
}

function D(t) {
    return _ = 5, U((function() {
        return {
            current: t
        }
    }), [])
}

function B(t, e, o) {
    _ = 6, z((function() {
        if ("function" == typeof t) {
            var o = t(e());
            return function() {
                t(null), o && "function" == typeof o && o()
            }
        }
        if (t) return t.current = e(),
            function() {
                return t.current = null
            }
    }), null == o ? o : o.concat(t))
}

function U(t, e) {
    var o = T(w++, 7);
    return K(o.__H, e) && (o.__ = t(), o.__H = e, o.__h = t), o.__
}

function L(t, e) {
    return _ = 8, U((function() {
        return t
    }), e)
}

function R(t) {
    var e = y.context[t.__c],
        o = T(w++, 9);
    return o.c = t, e ? (null == o.__ && (o.__ = !0, e.sub(y)), e.props.value) : t.__
}

function H() {
    for (var t; t = k.shift();)
        if (t.__P && t.__H) try {
            t.__H.__h.forEach(q), t.__H.__h.forEach($), t.__H.__h = []
        } catch (e) {
            t.__H.__h = [], E.__e(e, t.__v)
        }
}
E.__b = function(t) {
    y = null, S && S(t)
}, E.__ = function(t, e) {
    t && e.__k && e.__k.__m && (t.__m = e.__k.__m), j && j(t, e)
}, E.__r = function(t) {
    M && M(t), w = 0;
    var e = (y = t.__c).__H;
    e && (b === y ? (e.__h = [], y.__h = [], e.__.forEach((function(t) {
        t.__N && (t.__ = t.__N), t.u = t.__N = void 0
    }))) : (e.__h.forEach(q), e.__h.forEach($), e.__h = [], w = 0)), b = y
}, E.diffed = function(t) {
    P && P(t);
    var e = t.__c;
    e && e.__H && (e.__H.__h.length && (1 !== k.push(e) && x === E.requestAnimationFrame || ((x = E.requestAnimationFrame) || V)(H)), e.__H.__.forEach((function(t) {
        t.u && (t.__H = t.u), t.u = void 0
    }))), b = y = null
}, E.__c = function(t, e) {
    e.some((function(t) {
        try {
            t.__h.forEach(q), t.__h = t.__h.filter((function(t) {
                return !t.__ || $(t)
            }))
        } catch (o) {
            e.some((function(t) {
                t.__h && (t.__h = [])
            })), e = [], E.__e(o, t.__v)
        }
    })), O && O(t, e)
}, E.unmount = function(t) {
    C && C(t);
    var e, o = t.__c;
    o && o.__H && (o.__H.__.forEach((function(t) {
        try {
            q(t)
        } catch (t) {
            e = t
        }
    })), o.__H = void 0, e && E.__e(e, o.__v))
};
var F = "function" == typeof requestAnimationFrame;

function V(t) {
    var e, o = function() {
            clearTimeout(n), F && cancelAnimationFrame(e), setTimeout(t)
        },
        n = setTimeout(o, 35);
    F && (e = requestAnimationFrame(o))
}

function q(t) {
    var e = y,
        o = t.__c;
    "function" == typeof o && (t.__c = void 0, o()), y = e
}

function $(t) {
    var e = y;
    t.__c = t.__(), y = e
}

function K(t, e) {
    return !t || t.length !== e.length || e.some((function(e, o) {
        return e !== t[o]
    }))
}

function X(t, e) {
    return "function" == typeof e ? e(t) : e
}
const W = e({
        devMode: !1,
        element: null,
        instanceId: ""
    }),
    Y = () => R(W);

function J(t) {
    return G(t).map((t => t instanceof Error ? t : new Z(`[${typeof t}] ${function(t){if("string"!=typeof t)try{return JSON.stringify(t)??typeof t}catch{}return`
        $ {
            t
        }
        `}(t).slice(0,10240)}`)))
}

function G(t, e = 0) {
    return e >= 20 ? [t, "Truncated cause stack"] : t instanceof Error && t.cause ? [t, ...G(t.cause, e + 1)] : [t]
}
var Z = class extends Error {
        name = "BugsnagInvalidError"
    },
    Q = /^\s*at .*(\S+:\d+|\(native\))/m,
    tt = /^(eval@)?(\[native code])?$/;

function et(t) {
    return t.stack ? t.stack.match(Q) ? function(t) {
        return t.stack.split("\n").filter((t => !!t.match(Q))).map((t => {
            let e = t.replace(/^\s+/, "").replace(/^.*?\s+/, ""),
                o = e.match(/ (\(.+\)$)/);
            e = o ? e.replace(o[0], "") : e;
            let n = ot(o ? o[1] : e);
            return {
                method: o && e || void 0,
                file: ["eval", "<anonymous>"].indexOf(n[0]) > -1 ? void 0 : n[0],
                lineNumber: n[1],
                columnNumber: n[2]
            }
        }))
    }(t) : function(t) {
        return t.stack.split("\n").filter((t => !t.match(tt))).map((t => {
            if (-1 === t.indexOf("@") && -1 === t.indexOf(":")) return {
                method: t
            };
            let e = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                o = t.match(e),
                n = o && o[1] ? o[1] : void 0,
                r = ot(t.replace(e, ""));
            return {
                method: n,
                file: r[0],
                lineNumber: r[1],
                columnNumber: r[2]
            }
        }))
    }(t) : []
}

function ot(t) {
    if (-1 === t.indexOf(":")) return [t];
    let e = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(t.replace(/[()]/g, ""));
    return [e[1], e[2] ? Number(e[2]) : void 0, e[3] ? Number(e[3]) : void 0]
}
var nt = class {
    breadcrumbs = [];
    apiKey;
    plugins;
    appId;
    appType;
    appVersion;
    releaseStage;
    locale;
    userAgent;
    metadata;
    persistedMetadata;
    onError;
    onPostErrorListeners = [];
    endpoints;
    session;
    constructor(t) {
        this.apiKey = t.apiKey, this.appType = t.appType, this.appId = t.appId, this.appVersion = t.appVersion, this.releaseStage = t.releaseStage, this.locale = t.locale, this.userAgent = t.userAgent, this.metadata = t.metadata, this.onError = t.onError, this.persistedMetadata = {}, this.endpoints = t.endpoints ? ? {
            notify: "https://error-analytics-production.shopifysvc.com",
            sessions: "https://error-analytics-sessions-production.shopifysvc.com/observeonly"
        }, this.plugins = t.plugins ? ? [], this.plugins.forEach((t => t.load(this))), this.leaveBreadcrumb("Bugsnag started", void 0, "state"), (t.withSessionTracking ? ? 1) && (this.session = {
            id: this.getRandomUUID(),
            startedAt: (new Date).toISOString(),
            events: {
                handled: 0,
                unhandled: 0
            }
        }, this.startSession())
    }
    addMetadata(t) {
        for (let e of Object.keys(t)) this.persistedMetadata[e] = t[e]
    }
    getSessionId() {
        return this.session ? .id
    }
    leaveBreadcrumb(t, e, o = "manual") {
        this.breadcrumbs.push({
            name: t,
            metaData: e,
            type: o,
            timestamp: (new Date).toISOString()
        })
    }
    notify(t, {
        errorClass: e,
        severity: o,
        severityType: n,
        handled: r = !0,
        metadata: i,
        context: a,
        groupingHash: s
    } = {}) {
        let c = J(t),
            l = { ...this.metadata,
                ...this.persistedMetadata,
                ...i
            },
            d = this.buildBugsnagEvent(c, {
                errorClass: e,
                severityType: n,
                handled: r,
                severity: o,
                metadata: l,
                context: a,
                groupingHash: s
            });
        if ((this.onError ? .(d, t) ? ? 1) && "development" !== this.releaseStage) {
            this.updateAndAppendSessionInformation(d);
            let t = this.sendToBugsnag(d);
            return this.onPostErrorListeners.forEach((t => t(d))), t
        }
        return Promise.resolve()
    }
    addOnPostError(t) {
        this.onPostErrorListeners.push(t)
    }
    updateAndAppendSessionInformation(t) {
        this.session && (t.unhandled ? this.session.events.unhandled++ : this.session.events.handled++, t.session = this.session)
    }
    buildBugsnagEvent(t, {
        errorClass: e,
        severity: o = "error",
        severityType: n = "handledException",
        handled: r,
        metadata: i = {},
        context: a,
        groupingHash: s
    }) {
        let c = (new Date).toISOString(),
            {
                breadcrumbs: l,
                appId: d,
                appType: u,
                appVersion: p,
                releaseStage: h,
                locale: f,
                userAgent: g
            } = this,
            m = t.map(((t, o) => ({
                errorClass: 0 === o ? e ? ? t.name : t.name,
                stacktrace: rt(d, t),
                message: t.message,
                type: "browserjs"
            })));
        return {
            payloadVersion: "5",
            exceptions: m,
            severity: o,
            severityReason: {
                type: n
            },
            unhandled: !r,
            app: {
                id: d,
                type: u,
                version: p,
                releaseStage: h
            },
            device: {
                time: c,
                locale: f,
                userAgent: g
            },
            breadcrumbs: l,
            context: a,
            metaData: i,
            groupingHash: s
        }
    }
    async startSession() {
        if ("development" === this.releaseStage) return void console.log("Skipping error logging session tracking in development mode");
        let {
            apiKey: t
        } = this, e = {
            notifier: {
                name: "Bugsnag JavaScript",
                version: "7.22.2",
                url: "https://github.com/bugsnag/bugsnag-js"
            },
            app: {
                version: this.appVersion,
                releaseStage: this.releaseStage,
                type: this.appType
            },
            device: {
                id: this.appId,
                locale: this.locale,
                userAgent: this.userAgent
            },
            sessions: [this.session]
        };
        try {
            await fetch(this.endpoints.sessions, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Bugsnag-Api-Key": t,
                    "Bugsnag-Payload-Version": "5",
                    "Bugsnag-Sent-At": this.session ? .startedAt ? ? (new Date).toISOString()
                },
                body: JSON.stringify(e)
            })
        } catch (t) {
            console.warn("[bugsnag-light] failed to start session"), console.warn(t)
        }
    }
    async sendToBugsnag(t) {
        let {
            apiKey: e
        } = this, o = {
            apiKey: e,
            notifier: {
                name: "Bugsnag JavaScript",
                version: "7.22.2",
                url: "https://github.com/bugsnag/bugsnag-js"
            },
            events: [t]
        };
        try {
            await fetch(this.endpoints.notify, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Bugsnag-Api-Key": e,
                    "Bugsnag-Payload-Version": "5",
                    "Bugsnag-Sent-At": t.device.time
                },
                body: JSON.stringify(o)
            })
        } catch (t) {
            console.warn("[bugsnag-light] failed to send an event"), console.warn(t)
        }
    }
    getRandomUUID() {
        try {
            return crypto.randomUUID()
        } catch {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t => {
                let e = 16 * Math.random() | 0;
                return ("x" === t ? e : 3 & e | 8).toString(16)
            }))
        }
    }
};

function rt(t, e) {
    let o = et(e).map((e => {
        let o = e.file ? .includes(t);
        return {
            method: e.method ? ? "",
            file: e.file ? ? "",
            lineNumber: e.lineNumber ? ? 0,
            columnNumber: e.columnNumber,
            inProject: o
        }
    }));
    if (e instanceof Z) {
        let t = o.findIndex((t => t.method.endsWith("notify")));
        t > -1 && (o = o.slice(t + 1))
    }
    return o
}
var it = "e35d7136cee78d344ccffdbd5ca710fa";

function at(t, e) {
    if (!{}.hasOwnProperty.call(t, e)) throw new TypeError("attempted to use private field on non-instance");
    return t
}
var st = 0;

function ct(t) {
    return "__private_" + st++ + "_" + t
}

function lt(t) {
    return Object.entries(t).map((([t, e]) => ({
        key: t,
        value: {
            stringValue: String(e)
        }
    })))
}

function dt(t) {
    if (Array.isArray(t)) return {
        arrayValue: {
            values: t.map((t => dt(t)))
        }
    };
    switch (typeof t) {
        case "boolean":
            return {
                boolValue: Boolean(t)
            };
        case "number":
            return {
                doubleValue: Number(t)
            };
        default:
            return {
                stringValue: String(t)
            }
    }
}
const ut = function(t, e, o) {
    const n = [0];
    for (let r = 0; r < o; r++) {
        const o = Math.floor(t * e ** r);
        n.push(o)
    }
    return n
}(5, 2, 12);
var pt = ct("exporter"),
    ht = ct("attributes"),
    ft = ct("metrics"),
    gt = ct("logs");
class mt {
    constructor({
        exporter: t,
        attributes: e
    }) {
        Object.defineProperty(this, pt, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, ht, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, ft, {
            writable: !0,
            value: []
        }), Object.defineProperty(this, gt, {
            writable: !0,
            value: []
        }), at(this, pt)[pt] = t, at(this, ht)[ht] = null != e ? e : {}
    }
    addAttributes(t) {
        at(this, ht)[ht] = { ...at(this, ht)[ht],
            ...t
        }
    }
    histogram({
        name: t,
        value: e,
        unit: o,
        bounds: n,
        attributes: r,
        scale: i,
        requiresKeepalive: a
    }) {
        const s = 1e6 * Date.now();
        n ? at(this, ft)[ft].push({
            name: t,
            type: "histogram",
            value: e,
            unit: o,
            timeUnixNano: s,
            attributes: r,
            bounds: n,
            requiresKeepalive: a
        }) : at(this, ft)[ft].push({
            name: t,
            type: "exponential_histogram",
            value: e,
            unit: o,
            timeUnixNano: s,
            attributes: r,
            scale: i,
            requiresKeepalive: a
        })
    }
    counter({
        name: t,
        value: e,
        unit: o,
        attributes: n,
        requiresKeepalive: r
    }) {
        const i = 1e6 * Date.now();
        at(this, ft)[ft].push({
            name: t,
            type: "counter",
            value: e,
            unit: o,
            timeUnixNano: i,
            attributes: n,
            requiresKeepalive: r
        })
    }
    gauge({
        name: t,
        value: e,
        unit: o,
        attributes: n,
        requiresKeepalive: r
    }) {
        const i = 1e6 * Date.now();
        at(this, ft)[ft].push({
            name: t,
            type: "gauge",
            value: e,
            unit: o,
            timeUnixNano: i,
            attributes: n,
            requiresKeepalive: r
        })
    }
    log({
        body: t,
        attributes: e,
        requiresKeepalive: o
    }) {
        const n = 1e6 * Date.now();
        at(this, gt)[gt].push({
            timeUnixNano: n,
            body: t,
            attributes: e,
            requiresKeepalive: o
        })
    }
    async exportMetrics() {
        at(this, ft)[ft].forEach((t => {
            t.attributes = { ...at(this, ht)[ht],
                ...t.attributes
            }
        }));
        const t = at(this, ft)[ft];
        at(this, ft)[ft] = [], await this.exportByKeepalive(t, ((t, e) => at(this, pt)[pt].exportMetrics(this.aggregateMetrics(t), e)))
    }
    async exportLogs() {
        const t = at(this, gt)[gt];
        at(this, gt)[gt] = [], await this.exportByKeepalive(t, ((t, e) => at(this, pt)[pt].exportLogs(this.formatLogs(t), e)))
    }
    aggregateMetrics(t) {
        const e = {};
        return t.forEach((t => {
            switch (t.type) {
                case "histogram":
                    ! function(t, e) {
                        var o;
                        const {
                            name: n,
                            value: r,
                            unit: i,
                            timeUnixNano: a,
                            attributes: s
                        } = e, c = null !== (o = e.bounds) && void 0 !== o ? o : ut, l = new Array(c.length + 1).fill(0);
                        t[n] || = {
                            name: n,
                            unit: i || "1",
                            histogram: {
                                aggregationTemporality: 1,
                                dataPoints: []
                            }
                        };
                        for (let t = 0; t < l.length; t++) {
                            const e = c[t];
                            if (void 0 === e) l[t] = 1;
                            else if (r <= e) {
                                l[t] = 1;
                                break
                            }
                        }
                        t[n].histogram.dataPoints.push({
                            startTimeUnixNano: a,
                            timeUnixNano: a,
                            count: 1,
                            sum: r,
                            min: r,
                            max: r,
                            bucketCounts: l,
                            explicitBounds: c,
                            attributes: lt(null != s ? s : {})
                        })
                    }(e, t);
                    break;
                case "exponential_histogram":
                    ! function(t, e) {
                        const {
                            name: o,
                            value: n,
                            unit: r,
                            timeUnixNano: i,
                            attributes: a,
                            scale: s
                        } = e;
                        t[o] || = {
                            name: o,
                            unit: r || "1",
                            exponentialHistogram: {
                                aggregationTemporality: 1,
                                dataPoints: []
                            }
                        };
                        const c = n <= 0 ? 0 : n,
                            l = s || 3,
                            d = 2 ** l / Math.log(2),
                            u = Math.ceil(Math.log(n) * d) - 1,
                            p = n <= 0 ? 1 : 0,
                            h = {
                                offset: 0,
                                bucketCounts: []
                            },
                            f = {
                                offset: n > 0 ? u : 0,
                                bucketCounts: n > 0 ? [1] : []
                            };
                        t[o].exponentialHistogram.dataPoints.push({
                            attributes: lt(null != a ? a : {}),
                            startTimeUnixNano: i,
                            timeUnixNano: i,
                            count: 1,
                            sum: c,
                            scale: l,
                            zeroCount: p,
                            positive: f,
                            negative: h,
                            min: c,
                            max: c,
                            zeroThreshold: 0
                        })
                    }(e, t);
                    break;
                case "counter":
                    ! function(t, e) {
                        const {
                            name: o,
                            value: n,
                            unit: r,
                            timeUnixNano: i,
                            attributes: a
                        } = e;
                        t[o] || = {
                            name: o,
                            unit: r || "1",
                            sum: {
                                aggregationTemporality: 1,
                                isMonotonic: !0,
                                dataPoints: []
                            }
                        }, t[o].sum.dataPoints.push({
                            startTimeUnixNano: i,
                            timeUnixNano: i,
                            asDouble: n,
                            attributes: lt(null != a ? a : {})
                        })
                    }(e, t);
                    break;
                case "gauge":
                    ! function(t, e) {
                        const {
                            name: o,
                            value: n,
                            unit: r,
                            timeUnixNano: i,
                            attributes: a
                        } = e;
                        t[o] || = {
                            name: o,
                            unit: r || "1",
                            gauge: {
                                dataPoints: []
                            }
                        }, t[o].gauge.dataPoints.push({
                            startTimeUnixNano: i,
                            timeUnixNano: i,
                            asDouble: n,
                            attributes: lt(null != a ? a : {})
                        })
                    }(e, t)
            }
        })), Object.values(e)
    }
    async exportByKeepalive(t, e) {
        if (0 === t.length) return;
        const o = [],
            n = [];
        t.forEach((t => {
            var e;
            null === (e = t.requiresKeepalive) || void 0 === e || e ? o.push(t) : n.push(t)
        }));
        const r = [o.length > 0 ? e(o, {
            keepalive: !0
        }) : void 0, n.length > 0 ? e(n, {
            keepalive: !1
        }) : void 0].filter((t => void 0 !== t));
        await Promise.all(r)
    }
    formatLogs(t) {
        return t.map((t => {
            const e = {
                timeUnixNano: t.timeUnixNano,
                observedTimeUnixNano: t.timeUnixNano,
                attributes: (o = { ...at(this, ht)[ht],
                    ...t.attributes
                }, Object.entries(o).map((([t, e]) => ({
                    key: t,
                    value: dt(e)
                }))))
            };
            var o;
            return t.body && (e.body = {
                stringValue: t.body
            }), e
        }))
    }
}
var vt, wt, yt = ct("url"),
    bt = ct("serviceName"),
    xt = ct("logger"),
    _t = ct("fetchFn"),
    kt = ct("maxPayloadSizeBytes");
class Et {
    constructor(t, e, o) {
        var n;
        Object.defineProperty(this, yt, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, bt, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, xt, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, _t, {
            writable: !0,
            value: void 0
        }), Object.defineProperty(this, kt, {
            writable: !0,
            value: void 0
        }), at(this, yt)[yt] = t.replace(/\/v1\/(logs|metrics|traces)\/?$/, ""), at(this, bt)[bt] = e, at(this, xt)[xt] = null == o ? void 0 : o.logger, at(this, _t)[_t] = null == o ? void 0 : o.fetchFn, at(this, kt)[kt] = null !== (n = null == o ? void 0 : o.maxPayloadSizeBytes) && void 0 !== n ? n : 51200
    }
    async exportMetrics(t, e) {
        var o;
        const n = null === (o = null == e ? void 0 : e.keepalive) || void 0 === o || o;
        await this.exportBatches("/v1/metrics", [...t], (t => ({
            resourceMetrics: [{
                resource: {
                    attributes: [{
                        key: "service.name",
                        value: {
                            stringValue: at(this, bt)[bt]
                        }
                    }]
                },
                scopeMetrics: [{
                    scope: {
                        name: "open-telemetry-mini-client",
                        version: "1.1.0",
                        attributes: []
                    },
                    metrics: t
                }]
            }]
        })), n)
    }
    async exportLogs(t, e) {
        var o;
        const n = null === (o = null == e ? void 0 : e.keepalive) || void 0 === o || o;
        await this.exportBatches("/v1/logs", [...t], (t => ({
            resourceLogs: [{
                resource: {
                    attributes: [{
                        key: "service.name",
                        value: {
                            stringValue: at(this, bt)[bt]
                        }
                    }]
                },
                scopeLogs: [{
                    scope: {
                        name: "open-telemetry-mini-client",
                        version: "1.1.0",
                        attributes: []
                    },
                    logRecords: t
                }]
            }]
        })), n)
    }
    async exportTo(t, e, o) {
        var n;
        const r = JSON.stringify(t),
            i = (new TextEncoder).encode(r).length;
        if (i > at(this, kt)[kt]) throw new Mt(`Payload size ${i} exceeds ${at(this,kt)[kt]} bytes`);
        const a = await this.exporterFetch()(`${at(this,yt)[yt]}${e}`, {
            method: "POST",
            keepalive: o,
            headers: {
                "Content-Type": "application/json"
            },
            body: r
        });
        if (null === (n = at(this, xt)[xt]) || void 0 === n || n.log({
                status: a.status
            }), !a.ok) {
            if (400 === a.status) {
                const t = await a.text();
                throw new St(`Invalid OpenTelemetry Data: ${t}`)
            }
            if (429 === a.status || 503 === a.status) {
                const e = await a.text(),
                    o = a.headers.get("Retry-After"),
                    n = o ? {
                        seconds: Number(o)
                    } : void 0;
                throw new St("Server did not accept data", {
                    errorData: e,
                    retryAfter: n,
                    body: t
                })
            }
            if (401 === a.status || 403 === a.status) {
                const e = await a.text();
                throw new Pt(`Authentication failed: ${a.status} ${401===a.status?"Unauthorized":"Forbidden"}`, {
                    errorData: e,
                    body: t
                })
            }
            throw new St(`Server responded with ${a.status}`)
        }
    }
    exporterFetch() {
        return at(this, _t)[_t] || fetch
    }
    async exportBatches(t, e, o, n) {
        let r = e.length;
        for (; e.length > 0;) try {
            const i = e.slice(0, r);
            await this.exportTo(o(i), t, n), e.splice(0, r)
        } catch (t) {
            if (!(t instanceof Mt && r > 1)) throw t;
            r = Math.ceil(r / 2)
        }
    }
}
class St extends Error {
    constructor(t, e) {
        super(t), this.metadata = void 0, this.name = "OpenTelemetryClientError", this.metadata = e
    }
}
class Mt extends Error {
    constructor(...t) {
        super(...t), this.name = "PayloadTooLargeError"
    }
}
class Pt extends Error {
    constructor(t, e) {
        super(t), this.name = "AuthenticationFailedError", this.metadata = void 0, this.name = "AuthenticationFailedError", this.metadata = e
    }
}
class Ot extends mt {
    counter(t) {
        super.counter(t), this.exportMetrics()
    }
    gauge(t) {
        super.gauge(t), this.exportMetrics()
    }
    histogram(t) {
        super.histogram(t), this.exportMetrics()
    }
    log(t) {
        super.log(t), this.exportLogs()
    }
}
class Ct {
    constructor({
        exporter: t,
        getKeepalive: e
    }) {
        vt.set(this, void 0), wt.set(this, void 0), c(this, vt, t, "f"), c(this, wt, e, "f")
    }
    exportMetrics(t, e) {
        return l(this, void 0, void 0, (function*() {
            var o;
            try {
                yield d(this, vt, "f").exportMetrics(t, Object.assign(Object.assign({}, e), {
                    keepalive: d(this, wt, "f").call(this)
                }))
            } catch (n) {
                if (n instanceof St) {
                    const r = null === (o = n.metadata) || void 0 === o ? void 0 : o.retryAfter;
                    if (r) return void(yield new Promise((o => {
                        setTimeout((() => this.exportMetrics(t, e).finally(o)), 1e3 * r.seconds)
                    })))
                }
                throw n
            }
        }))
    }
    exportLogs(t, e) {
        return l(this, void 0, void 0, (function*() {
            var o;
            try {
                yield d(this, vt, "f").exportLogs(t, Object.assign(Object.assign({}, e), {
                    keepalive: d(this, wt, "f").call(this)
                }))
            } catch (n) {
                if (n instanceof St) {
                    const r = null === (o = n.metadata) || void 0 === o ? void 0 : o.retryAfter;
                    if (r) return void(yield new Promise((o => {
                        setTimeout((() => this.exportLogs(t, e).finally(o)), 1e3 * r.seconds)
                    })))
                }
                throw n
            }
        }))
    }
}
vt = new WeakMap, wt = new WeakMap;
const jt = {
    blockedRequest: "Blocked Request",
    emptyeEventCreatedAtMs: "event_created_at_ms metadata field cannot be empty",
    errorParsingCreatedAtMs: "Error parsing: X-Monorail-Edge-Event-Created-At-Ms",
    failedToReadRequestBody: "Failed to read request body",
    incorrectContentType: "Incorrect Content-Type. Expected: application/json or text/plain",
    methodNotAllowed: "Method Not Allowed",
    noPermissionToGetURL: "Your client does not have permission to get URL",
    noResponseFromEdge: "No response from edge",
    schemaValidationError: "Schema validation error"
};

function Tt() {
    {
        const t = new Et("https://otlp-http-production.shopifysvc.com/v1/metrics", "shop-js");
        return new Ct({
            exporter: t,
            getKeepalive: () => "readyState" in f && "complete" === f.readyState
        })
    }
}
const It = ["Load failed", "Failed to fetch", "when attempting to fetch resource"],
    At = ["Failed to fetch dynamically imported module", "Importing a module script failed"],
    Nt = new Set(["ShopPayPaymentRequest", "ShopPayPaymentRequestButton", "ShopPayPaymentRequestLogin"]),
    zt = ["NotFoundError", "NotSupportedError", "ReferenceError", "SyntaxError", "TypeError"],
    Dt = t => {
        const {
            errorClass: e,
            message: o
        } = t;
        return Boolean("NetworkError" === e || It.some((t => null == o ? void 0 : o.includes(t))) || (n = o, Boolean((null == n ? void 0 : n.includes("A network failure may have prevented the request from completing")) || (null == n ? void 0 : n.includes("Backpressure applied")))));
        var n
    },
    Bt = ({
        event: t,
        metadata: e,
        onNetworkError: o
    }) => {
        var n, r, i, s, c, l, d;
        const u = t.exceptions[0];
        if (!u) return !1;
        const p = null === (n = e.custom) || void 0 === n ? void 0 : n.feature;
        if (((t, e) => {
                const {
                    errorClass: o,
                    message: n
                } = t, r = "SecurityError" === o && (null == n ? void 0 : n.includes("Failed to read the 'cookie' property from 'Document'")) && (null == n ? void 0 : n.includes("sandboxed")), i = "SecurityError" === o && (null == n ? void 0 : n.includes("Blocked a frame with origin")) && (null == n ? void 0 : n.includes("from accessing a cross-origin frame")), a = "string" == typeof e && Nt.has(e), s = t.stacktrace.some((t => t.inProject));
                return Boolean(!s || r || i && a)
            })(u, "string" == typeof p ? p : void 0)) return !1;
        if ((t => zt.includes(t.errorClass))(u)) return !1;
        if ((t => "BugsnagInvalidError" === t.errorClass)(u)) return !1;
        if ((t => {
                const {
                    message: e
                } = t;
                return Boolean(At.some((t => null == e ? void 0 : e.includes(t))))
            })(u)) return o("DynamicImportError"), !1;
        if (Dt(u)) return o(), !1;
        const g = null === (i = null === (r = h.Shopify) || void 0 === r ? void 0 : r.featureAssets) || void 0 === i ? void 0 : i["shop-js"],
            m = Boolean(g && Object.keys(g).length > 0),
            v = Array.from(f.querySelectorAll('script[src*="/shop-js/"]')).map((t => t.src));
        t.device = {
            locale: a.userLanguage || a.language,
            userAgent: a.userAgent,
            orientation: null === (c = null === (s = h.screen) || void 0 === s ? void 0 : s.orientation) || void 0 === c ? void 0 : c.type,
            time: (new Date).toISOString()
        }, t.metaData = Object.assign(Object.assign(Object.assign({}, t.metaData), e), {
            custom: Object.assign(Object.assign(Object.assign({}, null === (l = t.metaData) || void 0 === l ? void 0 : l.custom), e.custom), {
                beta: !0,
                bundleLocale: "",
                compactUX: !0,
                domain: null === (d = null == h ? void 0 : h.location) || void 0 === d ? void 0 : d.hostname,
                shopJsUrls: v,
                shopJsFeatureAssetsExist: m
            })
        }), t.request = {
            url: h.location.href
        }
    };
class Ut {
    constructor(t) {
        this.opentelClient = new Ot({
            exporter: Tt()
        });
        const e = function({
            metadata: t,
            onNetworkError: e
        }) {
            return {
                apiKey: it,
                appId: "shop-js",
                appVersion: "1.1.0-beta",
                onError: o => Bt({
                    event: o,
                    metadata: t,
                    onNetworkError: e
                }),
                releaseStage: "production",
                withSessionTracking: !1
            }
        }({
            metadata: {
                custom: {
                    feature: t
                }
            },
            onNetworkError: this.handleNetworkError.bind(this)
        });
        this.client = new nt(e), this.feature = t || "", this.leaveBreadcrumb = this.leaveBreadcrumb.bind(this), this.notify = this.notify.bind(this)
    }
    leaveBreadcrumb(t, e, o) {
        this.client ? this.client.leaveBreadcrumb(t, e, o) : console.log("Bugsnag.leaveBreadcrumb() called before client creation.")
    }
    notify(t, e) {
        return l(this, void 0, void 0, (function*() {
            var o;
            this.client ? this.client.notify(t, e) : null === (o = console.warn) || void 0 === o || o.call(console, "Bugsnag.notify() called before client creation.")
        }))
    }
    handleNetworkError(t = "NetworkError") {
        this.opentelClient.counter({
            attributes: {
                feature: this.feature,
                error: t
            },
            name: "shop_js_network_error",
            value: 1
        })
    }
}
const Lt = e({
        client: void 0,
        leaveBreadcrumb: () => {
            throw new Error("Invalid attempt to call leaveBreadcrumb outside of context.")
        },
        notify: () => {
            throw new Error("Invalid attempt to call notify outside of context.")
        }
    }),
    Rt = ({
        children: t
    }) => {
        const {
            featureName: e
        } = Y(), o = U((() => {
            const {
                client: t,
                leaveBreadcrumb: o,
                notify: n
            } = new Ut(e);
            return {
                client: t,
                leaveBreadcrumb: o,
                notify: n
            }
        }), [e]);
        return v(Lt.Provider, {
            value: o,
            children: t
        })
    },
    Ht = () => {
        const t = R(Lt);
        if (!t) throw new Error("Invalid attempt to use useBugsnag outside of BugsnagProvider.");
        return t
    };

function Ft({
    children: t
}) {
    const [e] = function(t) {
        var e = T(w++, 10),
            o = I();
        return e.__ = t, y.componentDidCatch || (y.componentDidCatch = function(t, n) {
            e.__ && e.__(t, n), o[1](t)
        }), [o[0], function() {
            o[1](void 0)
        }]
    }(), {
        notify: n
    } = Ht();
    return N((() => {
        e && n(e instanceof Error ? e : new s(e, "UnhandledError"), {
            context: "Error in Preact tree"
        })
    }), [e, n]), v(o, {
        children: t
    })
}

function Vt(t, e = 200, o = !1) {
    const n = D(),
        r = D(t);
    return r.current = t, L(((...t) => {
        var i;
        const a = o && !n.current;
        "number" == typeof n.current && clearTimeout(n.current), n.current = setTimeout(((...t) => {
            var e;
            n.current = void 0, o || null === (e = r.current) || void 0 === e || e.call(r, ...t)
        }), e, ...t), a && (null === (i = r.current) || void 0 === i || i.call(r, ...t))
    }), [e, o])
}
const qt = e({
        log: () => {
            throw new Error("Invalid attempt to call log outside of context.")
        },
        recordCounter: () => {
            throw new Error("Invalid attempt to call recordCounter outside of context.")
        },
        recordGauge: () => {
            throw new Error("Invalid attempt to call recordGauge outside of context.")
        },
        recordHistogram: () => {
            throw new Error("Invalid attempt to call recordHistogram outside of context.")
        },
        client: void 0
    }),
    $t = () => R(qt),
    Kt = e({
        analyticsData: {
            analyticsTraceId: ""
        },
        getTrekkieAttributes: () => l(void 0, void 0, void 0, (function*() {
            return Promise.resolve({})
        })),
        produceMonorailEvent: () => {
            throw new Error("Invalid attempt to call produceMonorailEvent outside of context.")
        },
        trackModalStateChange: () => {
            throw new Error("Invalid attempt to call trackModalStateChange outside of context.")
        },
        trackPageImpression: () => l(void 0, void 0, void 0, (function*() {
            throw new Error("Invalid attempt to call trackPageImpression outside of context.")
        })),
        trackUserAction: () => {
            throw new Error("Invalid attempt to call trackUserAction outside of context.")
        },
        trackPostMessageTransmission: () => {
            throw new Error("Invalid attempt to call trackPostMessageTransmission outside of context.")
        }
    });

function Xt(t, e, o) {
    return (e = function(t) {
        var e = function(t, e) {
            if ("object" != typeof t || !t) return t;
            var o = t[Symbol.toPrimitive];
            if (void 0 !== o) {
                var n = o.call(t, e);
                if ("object" != typeof n) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return ("string" === e ? String : Number)(t)
        }(t, "string");
        return "symbol" == typeof e ? e : e + ""
    }(e)) in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t
}

function Wt(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        }))), o.push.apply(o, n)
    }
    return o
}

function Yt(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = null != arguments[e] ? arguments[e] : {};
        e % 2 ? Wt(Object(o), !0).forEach((function(e) {
            Xt(t, e, o[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : Wt(Object(o)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
        }))
    }
    return t
}
const Jt = "http://localhost:8082",
    Gt = "https://monorail-edge.shopifysvc.com",
    Zt = "/v1/produce";

function Qt(t) {
    return void 0 !== t.schemaId
}
class te {
    constructor(t) {
        this.producer = t
    }
    do(t, e) {
        return Qt(t) ? this.producer.produce(t) : this.producer.produceBatch(t)
    }
}

function ee() {
    if ("undefined" != typeof crypto && crypto && "function" == typeof crypto.randomUUID) return crypto.randomUUID();
    const t = new Array(36);
    for (let e = 0; e < 36; e++) t[e] = Math.floor(16 * Math.random());
    return t[14] = 4, t[19] = t[19] &= -5, t[19] = t[19] |= 8, t[8] = t[13] = t[18] = t[23] = "-", t.map((t => t.toString(16))).join("")
}

function oe(t, e = !0) {
    return t && Object.keys(t).length && e ? Object.keys(t).map((e => ({
        [ne(e)]: t[e]
    }))).reduce(((t, e) => Yt(Yt({}, t), e))) : t
}

function ne(t) {
    return t.split(/(?=[A-Z])/).join("_").toLowerCase()
}

function re(t) {
    return t.events.map((t => {
        let e = !0,
            o = !0;
        return t && t.options && Object.prototype.hasOwnProperty.call(t.options, "convertEventCase") && (e = Boolean(t.options.convertEventCase)), t && t.options && Object.prototype.hasOwnProperty.call(t.options, "convertMetaDataCase") && (o = Boolean(t.options.convertMetaDataCase)), Yt({
            schema_id: t.schemaId,
            payload: oe(t.payload, e)
        }, t.metadata && {
            metadata: oe(t.metadata, o)
        })
    }))
}
class ie extends Error {
    constructor(t) {
        super(`Error producing to the Monorail Edge. Response received: ${JSON.stringify(t)}`), Xt(this, "name", "MonorailUnableToProduceError"), this.response = t, Object.setPrototypeOf(this, ie.prototype)
    }
}
class ae extends Error {
    constructor(t) {
        super(`Response not from Monorail Edge. Response received: ${JSON.stringify(t)}`), Xt(this, "name", "MonorailInterceptedProduceError"), this.response = t, Object.setPrototypeOf(this, ae.prototype)
    }
}
class se extends Error {
    constructor(t) {
        super(`Error producing to the Monorail Edge. Response received: ${JSON.stringify(t)}`), Xt(this, "name", "MonorailBatchProduceError"), Object.setPrototypeOf(this, se.prototype), this.response = t
    }
}
class ce extends Error {
    constructor(t, e) {
        super(`Error completing request. A network failure may have prevented the request from completing. Error: ${t}. Schemas: ${Array.from(new Set(e)).join(", ")}`), Xt(this, "name", "MonorailRequestError"), Object.setPrototypeOf(this, ce.prototype)
    }
}
class le extends Error {
    constructor(t, e) {
        super(`Error reading response from Monorail Edge. Status: ${e||"unknown"}. Error: ${(null==t?void 0:t.message)||"Unknown error"}`), Xt(this, "name", "MonorailResponseReadError"), this.error = t, this.status = e, Object.setPrototypeOf(this, le.prototype)
    }
}
class de {
    static withEndpoint(t) {
        return new de(`https://${new URL(t).hostname}`)
    }
    constructor(t = Jt, e = {}) {
        var o, n;
        if (this.edgeDomain = t, this.optionsOrKeepalive = e, "boolean" == typeof e) return this.keepalive = e, void(this.detectInterceptedErrorEnabled = !1);
        this.keepalive = null !== (o = e.keepalive) && void 0 !== o && o, this.detectInterceptedErrorEnabled = null !== (n = e.detectInterceptedErrorEnabled) && void 0 !== n && n
    }
    async produceBatch(t) {
        const e = {
            events: re(t),
            metadata: oe(t.metadata)
        };
        let o, n;
        try {
            o = await fetch(this.produceBatchEndpoint(), {
                method: "post",
                headers: ue(t.metadata),
                body: JSON.stringify(e),
                keepalive: this.keepalive
            })
        } catch (e) {
            throw new ce(e, t.events.map((t => t.schemaId)))
        }
        if (207 === o.status) {
            const t = await o.json();
            throw new se(t)
        }
        try {
            n = await o.text()
        } catch (t) {
            throw new le(t, o.status)
        }
        if (!o.ok) {
            if (!Boolean(o.headers.get("x-request-id")) && this.detectInterceptedErrorEnabled) throw new ae({
                status: o.status,
                message: n
            });
            throw new ie({
                status: o.status,
                message: n
            })
        }
        return {
            status: o.status
        }
    }
    async produce(t) {
        let e, o, n = !0;
        t && t.options && Object.prototype.hasOwnProperty.call(t.options, "convertEventCase") && (n = Boolean(t.options.convertEventCase));
        try {
            e = await async function({
                endpoint: t,
                event: e,
                keepalive: o
            }) {
                var n, r, i, a, s;
                const c = e.metadata ? {
                    clientMessageId: null === (n = e.metadata) || void 0 === n ? void 0 : n.clientMessageId,
                    eventCreatedAtMs: null === (r = e.metadata) || void 0 === r ? void 0 : r.eventCreatedAtMs,
                    consent: null === (i = e.metadata) || void 0 === i ? void 0 : i.consent,
                    consent_provider: null === (a = e.metadata) || void 0 === a ? void 0 : a.consent_provider,
                    consent_version: null === (s = e.metadata) || void 0 === s ? void 0 : s.consent_version
                } : void 0;
                return fetch(null != t ? t : Gt + Zt, {
                    method: "post",
                    headers: ue(e.metadata),
                    body: JSON.stringify({
                        schema_id: e.schemaId,
                        payload: e.payload,
                        metadata: c && oe(c, !0)
                    }),
                    keepalive: o
                })
            }({
                endpoint: this.produceEndpoint(),
                keepalive: this.keepalive,
                event: Yt(Yt({}, t), {}, {
                    payload: oe(t.payload, n)
                })
            })
        } catch (e) {
            throw new ce(e, [t.schemaId])
        }
        if (!e) throw new ie({
            message: "No response from edge"
        });
        try {
            o = await e.text()
        } catch (t) {
            throw new le(t, e.status)
        }
        if (!e.ok) {
            if (!Boolean(e.headers.get("x-request-id")) && this.detectInterceptedErrorEnabled) throw new ae({
                status: e.status,
                message: o
            });
            throw new ie({
                status: e.status,
                message: o
            })
        }
        return {
            status: e.status
        }
    }
    produceBatchEndpoint() {
        return this.edgeDomain + "/unstable/produce_batch"
    }
    produceEndpoint() {
        return this.edgeDomain + Zt
    }
}

function ue(t) {
    const e = {
        "Content-Type": "application/json; charset=utf-8",
        "X-Monorail-Edge-Event-Created-At-Ms": (t && t.eventCreatedAtMs || Date.now()).toString(),
        "X-Monorail-Edge-Event-Sent-At-Ms": Date.now().toString(),
        "X-Monorail-Edge-Client-Message-Id": (t && t.clientMessageId || ee()).toString()
    };
    return t && t.userAgent && (e["User-Agent"] = t.userAgent), t && t.remoteIp && (e["X-Forwarded-For"] = t.remoteIp), t && t.deviceInstallId && (e["X-Monorail-Edge-Device-Install-Id"] = t.deviceInstallId), t && t.client && (e["X-Monorail-Edge-Client"] = t.client), t && t.clientOs && (e["X-Monorail-Edge-Client-OS"] = t.clientOs), e
}
class pe {
    static printWelcomeMessage(t) {
        console.log(`%c👋 from Monorail%c\n\nWe've noticed that you're${t?"":" not"} running in debug mode. As such, we will ${t?"produce":"not produce"} Monorail events to the console. \n\nIf you want Monorail events to ${t?"stop":"start"} appearing here, %cset debugMode=${(!t).toString()}%c, for the Monorail Log Producer in your code.`, "font-size: large;", "font-size: normal;", "font-weight: bold;", "font-weight: normal;")
    }
    constructor(t) {
        this.sendToConsole = t, t && pe.printWelcomeMessage(t)
    }
    async produce(t) {
        return this.sendToConsole && console.log("Monorail event produced", t), new Promise((e => {
            e(t)
        }))
    }
    produceBatch(t) {
        return this.sendToConsole && console.log("Monorail Batch event produced", t), new Promise((e => {
            e(t)
        }))
    }
}
class he {
    constructor(t) {
        this.version = t.version
    }
}
class fe {
    constructor(t, e = () => !1) {
        if (Xt(this, "eventsAwaitingConsent", []), null == t || !t.provider) throw new ge("ConsentTrackingMiddleware requires an instance of ConsentTrackingProvider");
        this.isStrictlyNecessary = e, this.provider = t.provider
    }
    async do(t, e) {
        if (Qt(t)) {
            const o = await this.provider.annotateEvent(t);
            return this.isConsentGivenForEmission(o) ? (await this.processBufferedEvents(e), e(o)) : this.isStrictlyNecessary(o) ? e(o) : (this.eventsAwaitingConsent.push(t), Promise.resolve({
                status: 0,
                message: "Consent not granted and event not marked strictly necessary, event not sent"
            }))
        } {
            if (this.isConsentGivenForEmission(await this.provider.annotateEvent(t.events[0]))) {
                await this.processBufferedEvents(e);
                const o = await Promise.all(t.events.map((t => this.provider.annotateEvent(t))));
                return e(Yt(Yt({}, t), {}, {
                    events: o
                }))
            }
            const o = t.events.filter((t => !!this.isStrictlyNecessary(t) || (this.eventsAwaitingConsent.push(t), !1)));
            if (o.length > 0) {
                const n = await Promise.all(o.map((t => this.provider.annotateEvent(t))));
                return e(Yt(Yt({}, t), {}, {
                    events: n
                }))
            }
            return Promise.resolve({
                status: 0,
                message: "Consent not granted for any event, and no event marked strictly necessary, event batch not sent"
            })
        }
    }
    isConsentGivenForEmission(t) {
        var e;
        const o = null === (e = t.metadata) || void 0 === e ? void 0 : e.consent,
            n = this.provider.getRequiredConsentForEmission();
        return Boolean(Array.isArray(o) && o.some((t => n.includes(t))))
    }
    async
    processBufferedEvents(t) {
        if (0 === this.eventsAwaitingConsent.length) return;
        const e = this.eventsAwaitingConsent;
        this.eventsAwaitingConsent = [];
        const o = await Promise.all(e.map((t => this.provider.annotateEvent(t))));
        await t({
            events: o
        })
    }
}
class ge extends Error {
    constructor(t) {
        super(t), Object.setPrototypeOf(this, ge.prototype)
    }
}

function me(t, e) {
    var o, n, r;
    if (t === e) return !0;
    if (typeof t != typeof e) return !1;
    if ("function" == typeof t && void 0 !== (null === (o = t.toString) || void 0 === o ? void 0 : o.call(t)) && (null === (n = t.toString) || void 0 === n ? void 0 : n.call(t)) === (null === (r = e.toString) || void 0 === r ? void 0 : r.call(e))) return !0;
    if (t && e && "object" == typeof t && "object" == typeof e) {
        if (t.constructor !== e.constructor) return !1;
        let o, n;
        const r = Object.keys(t);
        if (Array.isArray(t)) {
            if (o = t.length, o !== e.length) return !1;
            for (n = o; 0 != n--;)
                if (!me(t[n], e[n])) return !1;
            return !0
        }
        if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === e.valueOf();
        if (t.toString !== Object.prototype.toString) return t.toString() === e.toString();
        if (o = r.length, o !== Object.keys(e).length) return !1;
        for (n = o; 0 != n--;)
            if (!Object.prototype.hasOwnProperty.call(e, r[n])) return !1;
        for (n = o; 0 != n--;) {
            const o = r[n];
            if (!me(t[o], e[o])) return !1
        }
        return !0
    }
    return t != t && e != e
}
const ve = "",
    we = "1",
    ye = "0",
    be = "p",
    xe = "a",
    _e = "m",
    ke = "t",
    Ee = "m",
    Se = "a",
    Me = "p",
    Pe = "s";

function Oe(t) {
    try {
        return decodeURIComponent(t)
    } catch (t) {
        return ""
    }
}

function Ce(t, e = !1) {
    const o = function() {
        try {
            return document.cookie
        } catch {
            return !1
        }
    }() ? document.cookie.split("; ") : [];
    for (let e = 0; e < o.length; e++) {
        const [n, r] = o[e].split("=");
        if (t === Oe(n)) {
            return Oe(r)
        }
    }
    if (e && "_tracking_consent" === t && !window.localStorage.getItem("tracking_consent_fetched")) {
        if ("undefined" != typeof __CtaTestEnv__ && "true" === __CtaTestEnv__) return;
        return console.debug("_tracking_consent missing"),
            function(t = "/") {
                const e = new XMLHttpRequest;
                e.open("HEAD", t, !1), e.withCredentials = !0, e.send()
            }(), window.localStorage.setItem("tracking_consent_fetched", "true"), Ce(t, !1)
    }
}

function je() {
    const t = new URLSearchParams(window.location.search).get("_cs") || Ce("_tracking_consent");
    if (void 0 !== t) return function(t) {
        const e = t.slice(0, 1);
        if ("{" == e) return function(t) {
            var e;
            let o;
            try {
                o = JSON.parse(t)
            } catch {
                return
            }
            if ("2.1" !== o.v) return;
            if (null === (e = o.con) || void 0 === e || !e.CMP) return;
            return o
        }(t);
        if ("3" == e) return function(t) {
            const e = t.slice(1).split("_"),
                [o, n, r, i, a] = e;
            let s, c;
            try {
                s = e[5] ? JSON.parse(e.slice(5).join("_")) : void 0
            } catch {}
            if (a) {
                const t = a.replace(/\*/g, "/").replace(/-/g, "+"),
                    e = Array.from(atob(t)).map((t => t.charCodeAt(0).toString(16).padStart(2, "0"))).join("");
                c = [8, 13, 18, 23].reduce(((t, e) => t.slice(0, e) + "-" + t.slice(e)), e)
            }

            function l(t) {
                const e = o.split(".")[0];
                return e.includes(t.toLowerCase()) ? ye : e.includes(t.toUpperCase()) ? we : ve
            }

            function d(t) {
                return o.includes(t.replace("t", "s").toUpperCase())
            }
            return {
                v: "3",
                con: {
                    CMP: {
                        [Se]: l(Se),
                        [Me]: l(Me),
                        [Ee]: l(Ee),
                        [Pe]: l(Pe)
                    }
                },
                region: n || "",
                cus: s,
                purposes: {
                    [xe]: d(xe),
                    [be]: d(be),
                    [_e]: d(_e),
                    [ke]: d(ke)
                },
                sale_of_data_region: "t" == i,
                display_banner: "t" == r,
                consent_id: c
            }
        }(t);
        return
    }(t)
}

function Te(t) {
    const e = je();
    if (!e || !e.purposes) return !0;
    const o = e.purposes[t];
    return "boolean" != typeof o || o
}

function Ie() {
    return Te(xe)
}

function Ae() {
    return Te(be)
}

function Ne() {
    return Te(_e)
}

function ze() {
    return Te(ke)
}

function De() {
    const t = [];
    return Ie() && t.push("analytics"), Ne() && t.push("marketing"), ze() && t.push("sale_of_data"), Ae() && t.push("preferences"), t
}
class Be extends he {
    async annotateEvent(t) {
        return Promise.resolve(function(t, e) {
            if ("v1" === e) {
                const o = De();
                return { ...t,
                    metadata: { ...null == t ? void 0 : t.metadata,
                        consent: o,
                        consent_provider: "consent-tracking-api",
                        consent_version: e
                    }
                }
            }
            throw new Ue(e || "unknown")
        }(t, this.version))
    }
    getRequiredConsentForEmission() {
        if ("v1" === this.version) return ["analytics", "marketing"];
        throw new Ue(this.version || "unknown")
    }
}
class Ue extends Error {
    constructor(t) {
        super(`Version ${t} is not supported by the consent-tracking-api provider`), this.name = "MonorailConsentTrackingApiProviderVersionError", Object.setPrototypeOf(this, Ue.prototype)
    }
}

function Le() {
    var t;
    const e = null === (t = f.querySelector("script#shop-js-analytics")) || void 0 === t ? void 0 : t.innerHTML;
    return e ? JSON.parse(e) : {}
}

function Re() {
    return l(this, void 0, void 0, (function*() {
        let t;
        return Promise.race([new Promise((e => t = setTimeout((() => e({})), 1e4))), new Promise((t => {
            var e, o, n;
            const r = (null === (o = null === (e = h.ShopifyAnalytics) || void 0 === e ? void 0 : e.lib) || void 0 === o ? void 0 : o.ready) || (null === (n = h.analytics) || void 0 === n ? void 0 : n.ready);
            null == r || r((() => {
                var e, o, n, r;
                const i = (null === (o = null === (e = h.ShopifyAnalytics) || void 0 === e ? void 0 : e.lib) || void 0 === o ? void 0 : o.trekkie) || (null === (n = h.analytics) || void 0 === n ? void 0 : n.trekkie),
                    a = null !== (r = null == i ? void 0 : i.defaultAttributes) && void 0 !== r ? r : {};
                t(a)
            }))
        }))]).finally((() => clearTimeout(t)))
    }))
}

function He(...t) {
    return l(this, void 0, void 0, (function*() {
        var e;
        if (!h.ShopifyAnalytics && !h.analytics) return {};
        let o;
        Boolean(null === (e = h.trekkie) || void 0 === e ? void 0 : e.ready) ? o = Re() : (h.trekkie = h.trekkie || [], o = new Promise((t => {
            h.trekkie.push(["ready", () => {
                t(Re())
            }])
        })));
        const n = yield o;
        return t.reduce(((t, e) => {
            const o = n[e];
            return void 0 !== o && (t[e] = o), t
        }), {})
    }))
}
var Fe;
const Ve = "unspecified",
    qe = function() {
        const t = new Be({
            version: "v1"
        });
        return [new fe({
            provider: t
        })]
    }(),
    $e = ["completed", "emailsubmitted", "namesubmitted", "sheetmodalclosed", "sheetmodalopened"],
    Ke = class t {
        static createLogProducer(e) {
            return new t(new pe(e.debugMode), e.middleware || [])
        }
        static createHttpProducerWithEndpoint(e, o = []) {
            return new t(de.withEndpoint(e), o)
        }
        static createHttpProducer(e) {
            return new t(e.production ? new de(Gt, e.options) : new de(Jt, e.options), e.middleware || [])
        }
        static buildMiddlewareChain(t, e = 0) {
            return e === t.length ? this.identityFn : o => t[e].do(o, this.buildMiddlewareChain(t, e + 1))
        }
        constructor(e, o) {
            this.producer = e, this.middleware = o, this.executeChain = t.buildMiddlewareChain(this.middleware.concat(new te(e)))
        }
        produce(t) {
            return t.metadata = Yt({
                eventCreatedAtMs: Date.now(),
                clientMessageId: ee()
            }, t.metadata), this.executeChain(t)
        }
        produceBatch(t) {
            return this.executeChain(t)
        }
    }.createHttpProducer({
        production: !0,
        middleware: qe
    });
class Xe {
    constructor({
        analyticsData: t,
        devMode: e = !1,
        notify: o,
        recordCounter: n
    }) {
        var r;
        Fe.set(this, void 0), this.featureInitializationEventAlreadyEmitted = !1, this.trackedPageImpressions = new Set, c(this, Fe, Object.assign(Object.assign({}, t), {
            flowVersion: null !== (r = t.flowVersion) && void 0 !== r ? r : Ve
        }), "f"), this.devMode = e, this.notify = o, this.recordCounter = n, this.clearTrackedPageImpressions = this.clearTrackedPageImpressions.bind(this), this.produceMonorailEvent = this.produceMonorailEvent.bind(this), this.trackFeatureInitialization = this.trackFeatureInitialization.bind(this), this.trackModalStateChange = this.trackModalStateChange.bind(this), this.trackPageImpression = this.trackPageImpression.bind(this), this.trackUserAction = this.trackUserAction.bind(this), this.trackPostMessageTransmission = this.trackPostMessageTransmission.bind(this)
    }
    get analyticsData() {
        return d(this, Fe, "f")
    }
    set analyticsData(t) {
        const e = Object.assign(Object.assign({}, d(this, Fe, "f")), t);
        me(e, d(this, Fe, "f")) || c(this, Fe, e, "f")
    }
    clearTrackedPageImpressions() {
        this.trackedPageImpressions.clear()
    }
    produceMonorailEvent({
        event: t,
        onError: e,
        trekkieAttributes: o
    }) {
        this.devMode || (!o || Object.keys(o).length ? (t.payload = Object.assign(t.payload, o), Ke.produce(t).catch((t => {
            var o;
            if (null == e || e(t), function(t) {
                    var e, o, n, r, i, a, s;
                    const c = t instanceof le && 200 === t.status;
                    return !(t instanceof ce || t instanceof ie || (null === (e = null == t ? void 0 : t.message) || void 0 === e ? void 0 : e.includes("Invalid agent:")) || (null === (o = null == t ? void 0 : t.message) || void 0 === o ? void 0 : o.includes(".text is not a function")) || (null === (n = null == t ? void 0 : t.message) || void 0 === n ? void 0 : n.includes("event_sent_at_ms metadata field cannot be empty")) || (null === (r = null == t ? void 0 : t.message) || void 0 === r ? void 0 : r.includes("event_created_at_ms metadata field cannot be empty.")) || (null === (i = null == t ? void 0 : t.message) || void 0 === i ? void 0 : i.match(/Cannot read properties of (null|undefined) \(reading 'status'\)/)) || (null === (a = null == t ? void 0 : t.message) || void 0 === a ? void 0 : a.match(/(null|undefined) is not an object \(evaluating '[a-zA-Z]+\.status'\)/)) || (null === (s = null == t ? void 0 : t.message) || void 0 === s ? void 0 : s.match(/[a-zA-Z]+ is (null|undefined)/)) || c)
                }(t)) {
                const e = t instanceof Error ? t : new s(String(t), "MonorailProducerError");
                if (null === (o = this.notify) || void 0 === o || o.call(this, e), this.recordCounter) {
                    const t = function(t) {
                        const e = Object.values(jt).find((([e, o]) => t.message.includes(o)));
                        return (null == e ? void 0 : e[0]) || "otherErrors"
                    }(e);
                    this.recordCounter("shop_js_monorail_producer_error", {
                        attributes: {
                            error: t
                        }
                    })
                }
            }
        }))) : null == e || e({
            message: "trekkie attributes are empty"
        }))
    }
    trackFeatureInitialization() {
        return l(this, void 0, void 0, (function*() {
            var t, e, o, n;
            const {
                analyticsTraceId: r,
                apiKey: i,
                checkoutToken: a,
                flow: c,
                flowVersion: l = Ve,
                shopId: d,
                source: u = "unspecified",
                uxMode: p
            } = this.analyticsData;
            if (!c) return;
            this.featureInitializationEventAlreadyEmitted && (null === (t = this.notify) || void 0 === t || t.call(this, new s(`Feature Initialize Event already emitted once for the feature ${c}`, "MonorailLogicError", r)));
            const f = Le(),
                g = null !== (e = null == f ? void 0 : f.pageType) && void 0 !== e ? e : "",
                m = yield He("customerId", "isPersistentCookie", "path", "uniqToken", "visitToken"), v = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, i && {
                    apiKey: i
                }), a && {
                    checkoutToken: a
                }), d && {
                    shopId: d
                }), m), {
                    analyticsTraceId: r,
                    flow: c,
                    flowVersion: l,
                    sdkVersion: "1.1.0-beta",
                    shopPermanentDomain: null !== (n = null === (o = h.Shopify) || void 0 === o ? void 0 : o.shop) && void 0 !== n ? n : "",
                    source: u,
                    storefrontPageType: g,
                    uxMode: p
                });
            this.featureInitializationEventAlreadyEmitted = !0, this.produceMonorailEvent({
                event: {
                    schemaId: "shopify_pay_login_with_shop_sdk_feature_initialize/1.1",
                    payload: v
                }
            })
        }))
    }
    trackModalStateChange({
        currentState: t,
        dismissMethod: e,
        reason: o
    }) {
        var n;
        const {
            analyticsTraceId: r,
            checkoutToken: i,
            flow: a,
            flowVersion: s = "unspecified"
        } = this.analyticsData;
        a && (this.produceMonorailEvent({
            event: {
                schemaId: "shop_identity_modal_state_change/1.4",
                payload: {
                    analyticsTraceId: r,
                    checkoutToken: i,
                    currentState: t,
                    dismissMethod: e,
                    flow: a,
                    flowVersion: s,
                    previousState: this.previousModalState,
                    reason: o,
                    zoom: `${null===(n=h.visualViewport)||void 0===n?void 0:n.scale}`
                }
            }
        }), this.previousModalState = t)
    }
    trackPageImpression(t) {
        return l(this, arguments, void 0, (function*({
            allowDuplicates: t = !1,
            analyticsTraceId: e = this.analyticsData.analyticsTraceId,
            flow: o = this.analyticsData.flow,
            page: n,
            shopAccountUuid: r
        }) {
            var i, a, s;
            if (!t && this.trackedPageImpressions.has(n)) return;
            const {
                apiKey: c,
                checkoutToken: l,
                flowVersion: d = Ve
            } = this.analyticsData;
            if (!o) return;
            this.trackedPageImpressions.add(n);
            const u = Le(),
                p = null !== (i = null == u ? void 0 : u.pageType) && void 0 !== i ? i : "",
                f = yield He("customerId", "isPersistentCookie", "path", "uniqToken", "visitToken"), g = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, c && {
                    apiKey: c
                }), l && {
                    checkoutToken: l
                }), r && {
                    shopAccountUuid: r
                }), f), {
                    analyticsTraceId: e,
                    flow: o,
                    flowVersion: d,
                    pageName: n,
                    sdkVersion: "1.1.0-beta",
                    shopPermanentDomain: null !== (s = null === (a = h.Shopify) || void 0 === a ? void 0 : a.shop) && void 0 !== s ? s : "",
                    storefrontPageType: p
                });
            this.produceMonorailEvent({
                event: {
                    payload: g,
                    schemaId: "shopify_pay_login_with_shop_sdk_page_impressions/3.3"
                },
                onError: () => {
                    this.trackedPageImpressions.delete(n)
                },
                trekkieAttributes: f
            })
        }))
    }
    trackUserAction({
        userAction: t
    }) {
        var e, o;
        const {
            analyticsTraceId: n,
            apiKey: r,
            checkoutToken: i,
            checkoutVersion: a,
            flow: s,
            flowVersion: c = Ve,
            shopId: l
        } = this.analyticsData;
        if (!s) return;
        const d = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, r && {
            apiKey: r
        }), i && {
            checkoutToken: i
        }), a && {
            checkoutVersion: a
        }), l && {
            shopId: l
        }), {
            analyticsTraceId: n,
            flow: s,
            flowVersion: c,
            sdkVersion: "1.1.0-beta",
            shopPermanentDomain: null !== (o = null === (e = h.Shopify) || void 0 === e ? void 0 : e.shop) && void 0 !== o ? o : "",
            userAction: t
        });
        this.produceMonorailEvent({
            event: {
                schemaId: "shopify_pay_login_with_shop_sdk_user_actions/2.2",
                payload: d
            }
        })
    }
    trackPostMessageTransmission({
        direction: t,
        event: e
    }) {
        var o;
        const n = e.type;
        if (!$e.includes(n)) return;
        const r = Date.now(),
            i = e.messageId,
            {
                analyticsTraceId: a,
                checkoutToken: s,
                shopPermanentDomain: c
            } = this.analyticsData,
            l = function(t) {
                return "email" in t
            }(e) ? e.email : void 0,
            d = {
                eventType: n,
                direction: t,
                actor: "shop-js"
            };
        null === (o = this.recordCounter) || void 0 === o || o.call(this, "shop_js_post_message_transmission", {
            attributes: d
        }), this.produceMonorailEvent({
            event: {
                schemaId: "shop_identity_post_message_transmission/1.0",
                payload: {
                    messageId: i,
                    messageDirection: t,
                    actor: "shop-js",
                    payloadType: n,
                    clientTimestampMs: r,
                    analyticsTraceId: a,
                    checkoutToken: s,
                    shopifyDomain: c,
                    email: l
                }
            }
        })
    }
}
Fe = new WeakMap;
const We = ({
    analyticsContext: t = "loginWithShop",
    apiKey: e,
    checkoutVersion: o,
    checkoutToken: n,
    children: r,
    flow: i,
    flowVersion: a,
    shopId: s = 0,
    shopPermanentDomain: c,
    source: l,
    uxMode: d
}) => {
    const {
        notify: u
    } = Ht(), {
        recordCounter: p
    } = $t(), {
        devMode: h,
        instanceId: f
    } = Y(), g = D({
        analyticsContext: t,
        analyticsTraceId: f,
        apiKey: e,
        checkoutVersion: o,
        checkoutToken: n,
        flow: i,
        flowVersion: a,
        shopId: s,
        shopPermanentDomain: c,
        source: l,
        uxMode: d
    }), m = U((() => new Xe({
        analyticsData: g.current,
        devMode: h,
        notify: u,
        recordCounter: p
    })), [h, u, p]);
    m.analyticsData = Object.assign(Object.assign({}, g.current), {
        analyticsTraceId: f,
        analyticsContext: t,
        apiKey: e,
        checkoutVersion: o,
        checkoutToken: n,
        flow: i,
        flowVersion: a,
        shopId: s,
        shopPermanentDomain: c,
        source: l,
        uxMode: d
    }), N((() => () => {
        m.clearTrackedPageImpressions()
    }), [m]);
    const w = Vt((() => {
        m.trackFeatureInitialization()
    }), 100);
    N((() => {
        w()
    }), [w]);
    const y = U((() => ({
        analyticsData: m.analyticsData,
        getTrekkieAttributes: He,
        produceMonorailEvent: m.produceMonorailEvent,
        trackModalStateChange: m.trackModalStateChange,
        trackPageImpression: m.trackPageImpression,
        trackUserAction: m.trackUserAction,
        trackPostMessageTransmission: m.trackPostMessageTransmission
    })), [m.analyticsData, m.produceMonorailEvent, m.trackModalStateChange, m.trackPageImpression, m.trackUserAction, m.trackPostMessageTransmission]);
    return v(Kt.Provider, {
        value: y,
        children: r
    })
};

function Ye({
    children: t
}) {
    const {
        featureName: e
    } = Y(), o = U((() => new Ot({
        exporter: Tt()
    })), []), n = L((({
        body: t,
        attributes: n
    }) => {
        o.log({
            body: t,
            attributes: Object.assign({
                beta: !0,
                feature: e
            }, n)
        })
    }), [o, e]), r = L(((t, n = {}) => {
        const {
            attributes: r,
            unit: i,
            value: a = 1
        } = n;
        o.counter({
            attributes: Object.assign({
                beta: !0,
                feature: e
            }, r),
            name: t,
            value: a,
            unit: i
        })
    }), [o, e]), i = L(((t, n = {}) => {
        const {
            attributes: r,
            unit: i,
            value: a = 1
        } = n;
        o.gauge({
            attributes: Object.assign({
                beta: !0,
                feature: e
            }, r),
            name: t,
            value: a,
            unit: i
        })
    }), [o, e]), a = L(((t, n = {}) => {
        const {
            attributes: r,
            unit: i,
            value: a = 1,
            bounds: s
        } = n;
        o.histogram({
            attributes: Object.assign({
                beta: !0,
                feature: e
            }, r),
            bounds: s,
            name: t,
            value: a,
            unit: i
        })
    }), [o, e]), s = U((() => ({
        client: o,
        log: n,
        recordCounter: r,
        recordGauge: i,
        recordHistogram: a
    })), [o, n, r, i, a]);
    return v(qt.Provider, {
        value: s,
        children: t
    })
}

function Je({
    children: t,
    monorailProps: e
}) {
    return v(Rt, {
        children: v(Ft, {
            children: v(Ye, {
                children: v(We, Object.assign({}, e, {
                    children: t
                }))
            })
        })
    })
}
const Ge = ({
    children: t,
    devMode: e = !1,
    element: o,
    featureName: n
}) => {
    const r = U((() => g()), []);
    N((() => {
        o && o.setAttribute("data-instance-id", r)
    }), [o, r]);
    const i = U((() => ({
        devMode: e,
        element: o,
        featureName: n,
        instanceId: r
    })), [e, o, n, r]);
    return v(W.Provider, {
        value: i,
        children: t
    })
};
! function() {
    if ("undefined" != typeof document && !("adoptedStyleSheets" in document)) {
        var t = "ShadyCSS" in window && !ShadyCSS.nativeShadow,
            e = document.implementation.createHTMLDocument(""),
            o = new WeakMap,
            n = "object" == typeof DOMException ? Error : DOMException,
            r = Object.defineProperty,
            i = Array.prototype.forEach,
            a = /@import.+?;?$/gm,
            s = CSSStyleSheet.prototype;
        s.replace = function() {
            return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))
        }, s.replaceSync = function() {
            throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")
        };
        var c = new WeakMap,
            l = new WeakMap,
            d = new WeakMap,
            u = new WeakMap,
            p = P.prototype;
        p.replace = function(t) {
            try {
                return this.replaceSync(t), Promise.resolve(this)
            } catch (t) {
                return Promise.reject(t)
            }
        }, p.replaceSync = function(t) {
            if (M(this), "string" == typeof t) {
                var e = this;
                c.get(e).textContent = function(t) {
                    var e = t.replace(a, "");
                    return e !== t && console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"), e.trim()
                }(t), u.set(e, []), l.get(e).forEach((function(t) {
                    t.isConnected() && S(e, E(e, t))
                }))
            }
        }, r(p, "cssRules", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return M(this), c.get(this).sheet.cssRules
            }
        }), r(p, "media", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return M(this), c.get(this).sheet.media
            }
        }), ["addRule", "deleteRule", "insertRule", "removeRule"].forEach((function(t) {
            p[t] = function() {
                var e = this;
                M(e);
                var o = arguments;
                u.get(e).push({
                    method: t,
                    args: o
                }), l.get(e).forEach((function(n) {
                    if (n.isConnected()) {
                        var r = E(e, n).sheet;
                        r[t].apply(r, o)
                    }
                }));
                var n = c.get(e).sheet;
                return n[t].apply(n, o)
            }
        })), r(P, Symbol.hasInstance, {
            configurable: !0,
            value: _
        });
        var h = {
                childList: !0,
                subtree: !0
            },
            f = new WeakMap,
            g = new WeakMap,
            m = new WeakMap,
            v = new WeakMap;
        if (A.prototype = {
                isConnected: function() {
                    var t = g.get(this);
                    return t instanceof Document ? "loading" !== t.readyState : function(t) {
                        return "isConnected" in t ? t.isConnected : document.contains(t)
                    }(t.host)
                },
                connect: function() {
                    var t = T(this);
                    v.get(this).observe(t, h), m.get(this).length > 0 && I(this), j(t, (function(t) {
                        O(t).connect()
                    }))
                },
                disconnect: function() {
                    v.get(this).disconnect()
                },
                update: function(t) {
                    var e = this,
                        o = g.get(e) === document ? "Document" : "ShadowRoot";
                    if (!Array.isArray(t)) throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + o + ": Iterator getter is not callable.");
                    if (!t.every(_)) throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + o + ": Failed to convert value to 'CSSStyleSheet'");
                    if (t.some(k)) throw new TypeError("Failed to set the 'adoptedStyleSheets' property on " + o + ": Can't adopt non-constructed stylesheets");
                    e.sheets = t;
                    var n, r, i = m.get(e),
                        a = (n = t).filter((function(t, e) {
                            return n.indexOf(t) === e
                        }));
                    (r = a, i.filter((function(t) {
                        return -1 === r.indexOf(t)
                    }))).forEach((function(t) {
                        var o;
                        (o = E(t, e)).parentNode.removeChild(o),
                            function(t, e) {
                                d.get(t).delete(e), l.set(t, l.get(t).filter((function(t) {
                                    return t !== e
                                })))
                            }(t, e)
                    })), m.set(e, a), e.isConnected() && a.length > 0 && I(e)
                }
            }, window.CSSStyleSheet = P, C(Document), "ShadowRoot" in window) {
            C(ShadowRoot);
            var w = Element.prototype,
                y = w.attachShadow;
            w.attachShadow = function(t) {
                var e = y.call(this, t);
                return "closed" === t.mode && o.set(this, e), e
            }
        }
        var b = O(document);
        b.isConnected() ? b.connect() : document.addEventListener("DOMContentLoaded", b.connect.bind(b))
    }

    function x(t) {
        return t.shadowRoot || o.get(t)
    }

    function _(t) {
        return "object" == typeof t && (p.isPrototypeOf(t) || s.isPrototypeOf(t))
    }

    function k(t) {
        return "object" == typeof t && s.isPrototypeOf(t)
    }

    function E(t, e) {
        return d.get(t).get(e)
    }

    function S(t, e) {
        requestAnimationFrame((function() {
            e.textContent = c.get(t).textContent, u.get(t).forEach((function(t) {
                return e.sheet[t.method].apply(e.sheet, t.args)
            }))
        }))
    }

    function M(t) {
        if (!c.has(t)) throw new TypeError("Illegal invocation")
    }

    function P() {
        var t = this,
            o = document.createElement("style");
        e.body.appendChild(o), c.set(t, o), l.set(t, []), d.set(t, new WeakMap), u.set(t, [])
    }

    function O(t) {
        var e = f.get(t);
        return e || (e = new A(t), f.set(t, e)), e
    }

    function C(t) {
        r(t.prototype, "adoptedStyleSheets", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return O(this).sheets
            },
            set: function(t) {
                O(this).update(t)
            }
        })
    }

    function j(t, e) {
        for (var o = document.createNodeIterator(t, NodeFilter.SHOW_ELEMENT, (function(t) {
                return x(t) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
            }), null, !1), n = void 0; n = o.nextNode();) e(x(n))
    }

    function T(t) {
        var e = g.get(t);
        return e instanceof Document ? e.body : e
    }

    function I(t) {
        var e = document.createDocumentFragment(),
            o = m.get(t),
            n = v.get(t),
            r = T(t);
        n.disconnect(), o.forEach((function(o) {
            e.appendChild(E(o, t) || function(t, e) {
                var o = document.createElement("style");
                return d.get(t).set(e, o), l.get(t).push(e), o
            }(o, t))
        })), r.insertBefore(e, null), n.observe(r, h), o.forEach((function(e) {
            S(e, E(e, t))
        }))
    }

    function A(e) {
        var o = this;
        o.sheets = [], g.set(o, e), m.set(o, []), v.set(o, new MutationObserver((function(e, n) {
            document ? e.forEach((function(e) {
                t || i.call(e.addedNodes, (function(t) {
                    t instanceof Element && j(t, (function(t) {
                        O(t).connect()
                    }))
                })), i.call(e.removedNodes, (function(e) {
                    e instanceof Element && (function(t, e) {
                        return e instanceof HTMLStyleElement && m.get(t).some((function(e) {
                            return E(e, t)
                        }))
                    }(o, e) && I(o), t || j(e, (function(t) {
                        O(t).disconnect()
                    })))
                }))
            })) : n.disconnect()
        })))
    }
}();
var Ze = '*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/*! tailwindcss v3.4.14 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid;box-sizing:border-box}:after,:before{--tw-content:""}:host,html{-webkit-text-size-adjust:100%;font-feature-settings:normal;-webkit-tap-highlight-color:transparent;font-family:GTStandard-M,sans-serif;font-variation-settings:normal;line-height:1.5;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-feature-settings:normal;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em;font-variation-settings:normal}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]:where(:not([hidden=until-found])){display:none}:host{font-family:GTStandard-M,sans-serif}:host([data-nametag=shop-portal-provider]){all:initial!important}:host(shopify-payment-terms){font-family:inherit}.\\!container{width:100%!important}.container{width:100%}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.sr-only{clip:rect(0,0,0,0);border-width:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}.pointer-events-none{pointer-events:none}.\\!visible{visibility:visible!important}.visible{visibility:visible}.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.inset-05{inset:2px}.inset-x-0{left:0;right:0}.inset-y-0{bottom:0;top:0}.bottom-8{bottom:32px}.bottom-\\[15\\%\\]{bottom:15%}.right-0{right:0}.-z-10{z-index:-10}.z-0{z-index:0}.z-10{z-index:10}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.z-max{z-index:2147483647}.-m-px{margin:-1px}.m-0{margin:0}.m-\\[1em\\]{margin:1em}.m-auto{margin:auto}.mx-auto{margin-left:auto;margin-right:auto}.my-0\\.5{margin-bottom:.125rem;margin-top:.125rem}.my-1{margin-bottom:4px;margin-top:4px}.my-4{margin-bottom:16px;margin-top:16px}.my-7{margin-bottom:28px;margin-top:28px}.my-px{margin-bottom:1px;margin-top:1px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}.mb-5{margin-bottom:20px}.mb-7{margin-bottom:28px}.ml-1{margin-left:4px}.ml-auto{margin-left:auto}.mr-20{margin-right:5rem}.mr-3{margin-right:12px}.mt-4{margin-top:16px}.box-content{box-sizing:initial}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.aspect-branded-button-icon{aspect-ratio:60/25}.aspect-shop-pay-icon{aspect-ratio:99/25}.size-5{height:20px;width:20px}.size-6{height:24px;width:24px}.size-8{height:32px;width:32px}.size-full{height:100%;width:100%}.h-0{height:0}.h-10{height:40px}.h-3{height:12px}.h-4{height:16px}.h-4-5{height:18px}.h-5{height:20px}.h-8{height:32px}.h-9{height:36px}.h-\\[14px\\]{height:14px}.h-\\[22px\\]{height:22px}.h-auto{height:auto}.h-branded-button-icon{height:var(--font-paragraph--size,16px)}.h-px{height:1px}.max-h-8{max-height:32px}.max-h-full{max-height:100%}.w-1{width:4px}.w-16{width:64px}.w-22{width:88px}.w-37{width:148px}.w-44{width:11rem}.w-55{width:220px}.w-6{width:24px}.w-85{width:340px}.w-9{width:36px}.w-\\[432px\\]{width:432px}.w-\\[59px\\]{width:59px}.w-auto{width:auto}.w-fit{width:fit-content}.w-full{width:100%}.w-pay-button{width:var(--shop-pay-button-width,260px)}.w-px{width:1px}.min-w-0{min-width:0}.min-w-100{min-width:400px}.min-w-85{min-width:340px}.max-w-100{max-width:400px}.max-w-85{max-width:340px}.max-w-\\[40\\%\\]{max-width:40%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-none{flex:none}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.translate-x-0{--tw-translate-x:0px}.translate-x-0,.translate-y-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-0{--tw-translate-y:0px}.translate-y-94{--tw-translate-y:376px}.translate-y-94,.translate-y-\\[9\\.375\\%\\]{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.translate-y-\\[9\\.375\\%\\]{--tw-translate-y:9.375%}.rotate-45{--tw-rotate:45deg}.rotate-45,.scale-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.scale-100,.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes follow{0%{transform:scaleY(1);width:100%}25%{transform:scaleY(1)}50%{transform:scaleY(1.2)}to{transform:scaleY(1);width:36px}}.animate-follow{animation:follow .3s cubic-bezier(.45,0,.15,1)}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes reveal{to{stroke-dashoffset:408}}.animate-reveal{animation:reveal 1.3s ease-in-out 0s infinite reverse}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1.3s linear infinite}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;user-select:none}.resize{resize:both}.list-none{list-style-type:none}.appearance-none{appearance:none}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-nowrap{flex-wrap:nowrap}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-2{gap:8px}.gap-3{gap:12px}.gap-text-icon{gap:.25em}.gap-x-1{column-gap:4px}.gap-x-1-5{column-gap:6px}.gap-x-3{column-gap:12px}.gap-x-4{column-gap:16px}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(12px*var(--tw-space-y-reverse));margin-top:calc(12px*(1 - var(--tw-space-y-reverse)))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(16px*var(--tw-space-y-reverse));margin-top:calc(16px*(1 - var(--tw-space-y-reverse)))}.self-center{align-self:center}.overflow-hidden{overflow:hidden}.overflow-visible{overflow:visible}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;white-space:nowrap}.text-ellipsis,.truncate{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-line{white-space:pre-line}.rounded-login-button{border-radius:var(--buttons-radius,var(--x-primary-button-border-radius,var(--shop-pay-button-border-radius,12px)))}.rounded-login-card{border-radius:var(--x-border-radius-large,12px)}.rounded-max{border-radius:999px}.rounded-md{border-radius:12px}.rounded-sm{border-radius:8px}.rounded-sm100{border-radius:10px}.rounded-xs{border-radius:4px}.rounded-xxl{border-radius:28px}.border{border-width:1px}.border-0{border-width:0}.border-\\[0\\.5px\\]{border-width:.5px}.border-b{border-bottom-width:1px}.border-t{border-top-width:1px}.border-solid{border-style:solid}.border-none{border-style:none}.border-checkout-branded{border-color:var(--x-textfield-border-color,#00000014)}.border-checkout-branded-dark{border-color:#ffffff14}.border-grayscale-l2{--tw-border-opacity:1;border-color:rgb(203 203 202/var(--tw-border-opacity))}.border-grayscale-l2l{--tw-border-opacity:1;border-color:rgb(227 227 227/var(--tw-border-opacity))}.border-white\\/20{border-color:#fff3}.bg-core-idp-social-logins{background-color:var(--x-social-color-background,#fff)}.bg-grayscale-l2{--tw-bg-opacity:1;background-color:rgb(203 203 202/var(--tw-bg-opacity))}.bg-grayscale-l3{--tw-bg-opacity:1;background-color:rgb(240 240 240/var(--tw-bg-opacity))}.bg-grayscale-l4{--tw-bg-opacity:1;background-color:rgb(242 244 245/var(--tw-bg-opacity))}.bg-grayscale-primary-light{--tw-bg-opacity:1;background-color:rgb(112 112 112/var(--tw-bg-opacity))}.bg-overlay{background-color:#0006}.bg-poppy-d1{--tw-bg-opacity:1;background-color:rgb(217 42 15/var(--tw-bg-opacity))}.bg-poppy-l2{--tw-bg-opacity:1;background-color:rgb(255 236 233/var(--tw-bg-opacity))}.bg-purple-primary{--tw-bg-opacity:1;background-color:rgb(84 51 235/var(--tw-bg-opacity))}.bg-transparent{background-color:initial}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-5{--tw-bg-opacity:0.05}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.bg-none{background-image:none}.from-transparent{--tw-gradient-from:#0000 var(--tw-gradient-from-position);--tw-gradient-to:#0000 var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.to-white{--tw-gradient-to:#fff var(--tw-gradient-to-position)}.fill-purple-primary{fill:#5433eb}.stroke-white{stroke:#fff}.p-0{padding:0}.p-3{padding:12px}.p-4{padding:16px}.p-6{padding:24px}.p-8{padding:32px}.p-shop-button{padding:max(var(--button-padding-block,16px),8px) max(var(--button-padding-inline,44px),16px)}.p-shop-login{padding:var(--x-spacing-base,14px)}.px-0{padding-left:0;padding-right:0}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-5{padding-left:20px;padding-right:20px}.px-6{padding-left:24px;padding-right:24px}.py-1{padding-bottom:4px;padding-top:4px}.py-2-5{padding-bottom:10px;padding-top:10px}.py-3{padding-bottom:12px;padding-top:12px}.py-4{padding-bottom:16px;padding-top:16px}.pb-0{padding-bottom:0}.pb-2{padding-bottom:8px}.pb-3{padding-bottom:12px}.pb-4{padding-bottom:16px}.pb-6{padding-bottom:24px}.pr-1\\.5{padding-right:.375rem}.pr-3{padding-right:12px}.pt-0{padding-top:0}.pt-3{padding-top:12px}.pt-4{padding-top:16px}.text-center{text-align:center}.align-middle{vertical-align:middle}.font-inherit{font-family:inherit}.font-sans{font-family:GTStandard-M,sans-serif}.font-system{font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.text-body-large{font-size:16px;font-weight:450;letter-spacing:-.5px;line-height:22px}.text-body-small{font-weight:450}.text-body-small,.text-body-title-small{font-size:14px;letter-spacing:-.2px;line-height:18px}.text-body-title-small{font-weight:500}.text-branded-button{font-size:var(--font-paragraph--size,16px);font-weight:500;letter-spacing:-.5px;line-height:var(--font-paragraph--line-height,22px)}.text-button-large{font-size:16px;font-weight:600;letter-spacing:-.5px;line-height:22px}.text-button-medium{font-size:14px;font-weight:600;letter-spacing:-.2px;line-height:18px}.text-caption{font-size:12px;font-weight:450;letter-spacing:-.2px;line-height:16px}.text-subtitle{font-size:18px;font-weight:500;letter-spacing:-1px;line-height:20px}.font-bold{font-weight:700}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.leading-6{line-height:1.5rem}.leading-normal{line-height:1.5}.leading-snug{line-height:1.375}.tracking-wider{letter-spacing:.05em}.text-black{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.text-grayscale-d0{--tw-text-opacity:1;color:rgb(102 102 102/var(--tw-text-opacity))}.text-grayscale-d1{--tw-text-opacity:1;color:rgb(64 64 64/var(--tw-text-opacity))}.text-grayscale-d2\\/70{color:#121212b3}.text-grayscale-l1{--tw-text-opacity:1;color:rgb(168 168 167/var(--tw-text-opacity))}.text-grayscale-l4{--tw-text-opacity:1;color:rgb(242 244 245/var(--tw-text-opacity))}.text-poppy-d1{--tw-text-opacity:1;color:rgb(217 42 15/var(--tw-text-opacity))}.text-purple-primary{--tw-text-opacity:1;color:rgb(84 51 235/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.underline{text-decoration-line:underline}.no-underline{text-decoration-line:none}.opacity-0{opacity:0}.opacity-100{opacity:1}.shadow-card{--tw-shadow:0 4px 12px #0000000a;--tw-shadow-colored:0 4px 12px var(--tw-shadow-color)}.shadow-card,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0px 8px 30px 0px #0006;--tw-shadow-colored:0px 8px 30px 0px var(--tw-shadow-color)}.shadow-sm{--tw-shadow:0px 1px 4px 0px #0000001a;--tw-shadow-colored:0px 1px 4px 0px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.ring-1{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.ring-inset{--tw-ring-inset:inset}.ring-black\\/5{--tw-ring-color:#0000000d}.blur{--tw-blur:blur(8px)}.blur,.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur-xl{--tw-backdrop-blur:blur(24px);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-\\[height\\]{transition-duration:.15s;transition-property:height;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-colors{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-duration:.15s;transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-300{transition-duration:.3s}.duration-400{transition-duration:.4s}.ease-cubic-modal{transition-timing-function:cubic-bezier(.32,.72,0,1)}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}.will-change-transform{will-change:transform}.forced-color-adjust-none{forced-color-adjust:none}.stroke-dasharray-reveal{stroke-dasharray:136}.stroke-dashoffset-reveal{stroke-dashoffset:136}.\\[interpolate-size\\:allow-keywords\\]{interpolate-size:allow-keywords}.first_pt-0:first-child{padding-top:0}.last_border-b-0:last-child{border-bottom-width:0}.last_pb-0:last-child{padding-bottom:0}.hover_text-black:hover{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.hover_text-grayscale-d0:hover{--tw-text-opacity:1;color:rgb(102 102 102/var(--tw-text-opacity))}.hover_opacity-70:hover{opacity:.7}.hover_opacity-80:hover{opacity:.8}.hover_outline-none:hover{outline:2px solid #0000;outline-offset:2px}.focus_text-black:focus{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.focus_text-grayscale-d0:focus{--tw-text-opacity:1;color:rgb(102 102 102/var(--tw-text-opacity))}.focus_opacity-70:focus{opacity:.7}.focus_outline-none:focus{outline:2px solid #0000;outline-offset:2px}.focus_outline-0:focus{outline-width:0}.focus_ring:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus_ring-purple-l1:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(156 131 248/var(--tw-ring-opacity))}.focus-visible_outline-none:focus-visible{outline:2px solid #0000;outline-offset:2px}.focus-visible_ring:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible_ring-purple-l1:focus-visible{--tw-ring-opacity:1;--tw-ring-color:rgb(156 131 248/var(--tw-ring-opacity))}.active_text-black:active{--tw-text-opacity:1;color:rgb(0 0 0/var(--tw-text-opacity))}.active_text-grayscale-d0:active{--tw-text-opacity:1;color:rgb(102 102 102/var(--tw-text-opacity))}.active_opacity-70:active{opacity:.7}.active_outline-none:active{outline:2px solid #0000;outline-offset:2px}.hover_enabled_bg-purple-d0:enabled:hover{--tw-bg-opacity:1;background-color:rgb(69 36 219/var(--tw-bg-opacity))}.hover_enabled_bg-transparent:enabled:hover{background-color:initial}.focus_enabled_outline-none:enabled:focus{outline:2px solid #0000;outline-offset:2px}.focus_enabled_ring:enabled:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus_enabled_ring-purple-l1:enabled:focus{--tw-ring-opacity:1;--tw-ring-color:rgb(156 131 248/var(--tw-ring-opacity))}.focus-visible_enabled_outline-none:enabled:focus-visible{outline:2px solid #0000;outline-offset:2px}.focus-visible_enabled_ring:enabled:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000)}.focus-visible_enabled_ring-purple-l1:enabled:focus-visible{--tw-ring-opacity:1;--tw-ring-color:rgb(156 131 248/var(--tw-ring-opacity))}.disabled_opacity-50:disabled{opacity:.5}.group:hover .group-hover_bg-purple-d0{--tw-bg-opacity:1;background-color:rgb(69 36 219/var(--tw-bg-opacity))}.group:hover .group-hover_text-grayscale-l2l{--tw-text-opacity:1;color:rgb(227 227 227/var(--tw-text-opacity))}.aria-hidden_opacity-0[aria-hidden=true]{opacity:0}.data-hidden_invisible[data-visible=false]{visibility:hidden}.data-hidden_absolute[data-visible=false]{position:absolute}.data-hidden_inset-0[data-visible=false]{inset:0}.data-hidden_hidden[data-visible=false]{display:none}.data-hidden_opacity-0[data-visible=false]{opacity:0}.group[data-visible=false] .group-data-hidden_translate-x-full{--tw-translate-x:100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group[data-visible=false] .group-data-hidden_animate-none{animation:none}.group[data-visible=false] .group-data-hidden_opacity-0{opacity:0}@media (prefers-reduced-motion:reduce){.motion-reduce_animate-none{animation:none}.motion-reduce_transition-none{transition-property:none}.motion-reduce_transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.motion-reduce_duration-0{transition-duration:0s}}@media (max-width:448px){.sm_absolute{position:absolute}.sm_inset-x-0{left:0;right:0}.sm_bottom-0{bottom:0}.sm_top-auto{top:auto}.sm_hidden{display:none}.sm_max-w-none{max-width:none}.sm_translate-y-0{--tw-translate-y:0px}.sm_translate-y-0,.sm_translate-y-full{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm_translate-y-full{--tw-translate-y:100%}.sm_scale-100{--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm_rounded-none{border-radius:0}.sm_rounded-b-none{border-bottom-left-radius:0;border-bottom-right-radius:0}}';
const Qe = h.HTMLElement,
    to = t => {
        const e = h.HTMLElement;
        h.HTMLElement = Qe;
        const o = t();
        return h.HTMLElement = e, o
    },
    eo = t => to((() => f.createElement(t))),
    oo = {
        boolean: {
            stringify: t => "" === t ? "true" : t ? /^[ty1-9]/i.test(t).toString() : "false",
            parse: (t, e, o) => "" === t || (t ? /^[ty1-9]/i.test(t) : o.hasAttribute(e) && null === t)
        },
        function: {
            stringify: t => "function" == typeof t ? t.name.replace("bound ", "") : "string" == typeof t ? t.replace("bound ", "") : t,
            parse: (t, e, o) => {
                if (!t) return null;
                const n = "undefined" != typeof window ? window[t] : "undefined" != typeof global ? global[t] : void 0;
                return "function" == typeof n ? n.bind(o) : void 0
            }
        },
        number: {
            stringify: t => `${t}`,
            parse: t => {
                if (t) return parseFloat(t)
            }
        },
        string: {
            stringify: t => t,
            parse: t => {
                if (t) return t
            }
        }
    };

function no(t, {
    getters: e,
    methods: o,
    name: a,
    props: c,
    shadow: l,
    singleton: d
}) {
    var h;
    if ("undefined" == typeof window) return;
    const {
        notify: f
    } = new Ut(a);

    function g() {
        const e = (t => to((() => Reflect.construct(HTMLElement, [], t))))(g);
        if (e._eventListenerReadyPromise = new Promise((t => {
                e._eventListenerReadyPromiseResolve = t
            })), e._vdomComponent = t, e._root = l ? e.attachShadow({
                mode: l
            }) : e, l) {
            const t = new CSSStyleSheet;
            t.replaceSync(Ze), e._root.adoptedStyleSheets = [t]
        }
        return e
    }
    const m = new Map;
    Object.entries(c || {}).forEach((([t, e]) => {
        const o = u(t);
        m.set(o, {
            attribute: o,
            preactProp: t,
            type: e
        })
    }));
    const v = Array.from(m.values()).map((({
        attribute: t
    }) => t));

    function w(t) {
        this.getChildContext = () => t.context;
        const {
            context: e,
            children: o
        } = t, r = p(t, ["context", "children"]);
        return n(o, r)
    }

    function y(t) {
        return i("slot", Object.assign({}, t))
    }

    function b(t, e) {
        if (3 === t.nodeType) return t.data;
        if (1 !== t.nodeType) return null;
        const o = {},
            n = [],
            {
                childNodes: r
            } = t;
        m.forEach((({
            attribute: e,
            preactProp: n,
            type: r
        }) => {
            const i = oo[r],
                a = t.getAttribute(e);
            let s = a;
            ("boolean" === r || a) && (s = i.parse(a, e, t)), null !== s && (o[e] = s, o[n] = s)
        }));
        for (const t of r) {
            const e = b(t, null);
            n.push(e)
        }
        const a = e ? i(y, null, n) : n;
        return i(e, o, a)
    }
    g.prototype = Object.create(HTMLElement.prototype), g.prototype.constructor = g, g.observedAttributes = v, g.prototype.attributeChangedCallback = function(t, e, o) {
        if (!this._vdom) return;
        const i = m.get(t);
        if (!i) return;
        const {
            preactProp: a,
            type: s
        } = i, c = oo[s], l = {};
        if (o || "boolean" !== s) {
            if (s && o) {
                const e = c.parse(o, t, this);
                l[t] = e, l[a] = e
            }
        } else {
            const e = c.parse(o, t, this);
            l[t] = e, l[a] = e
        }
        this._vdom = n(this._vdom, l), r(this._vdom, this._root)
    }, g.prototype.connectedCallback = function() {
        if (d && document.querySelectorAll(a).length > 1) return void this.remove();
        const t = new CustomEvent("_preact", {
            detail: {},
            bubbles: !0,
            cancelable: !0
        });
        this.dispatchEvent(t);
        const e = t.detail.context;
        this._vdom = i(w, Object.assign(Object.assign({}, this._props), {
            context: e,
            element: this
        }), b(this, this._vdomComponent)), r(this._vdom, this._root)
    }, null == o || o.forEach((t => {
        g.prototype[t] = function(e) {
            this._eventListenerReadyPromise.then((() => {
                this.dispatchEvent(new CustomEvent(t, {
                    detail: e
                }))
            })).catch((() => {
                f(new s(`Custom element ${a}: Error listening for methods`, "CustomElementMethodListenerError"))
            }))
        }
    })), Object.entries(e || {}).forEach((([t, e]) => {
        t in HTMLElement.prototype || t in g.prototype ? f(new s(`Custom element ${a}: getter "${t}" collides with an existing property`, "CustomElementGetterCollisionError")) : Object.defineProperty(g.prototype, t, {
            get: e,
            configurable: !0,
            enumerable: !0
        })
    })), g.prototype.disconnectedCallback = function() {
        r(this._vdom = null, this._root)
    }, m.forEach((({
        attribute: t,
        preactProp: e,
        type: o
    }) => {
        const i = oo[o];
        Object.defineProperty(g.prototype, t, {
            get() {
                return this._vdom && this._vdom.props ? this._vdom.props[t] : null
            },
            set(e) {
                let n = e;
                this._vdom ? this.attributeChangedCallback(t, null, e) : (("boolean" === o || e) && (n = i.parse(e, t, this)), this._props || (this._props = {}), this._props[t] = n, this.connectedCallback()), this.setAttribute(t, i.stringify(n))
            }
        }), "function" === o && e !== t && Object.defineProperty(g.prototype, e, {
            get() {
                return this._vdom && this._vdom.props ? this._vdom.props[e] : null
            },
            set(o) {
                if ("function" != typeof o && null !== o) return;
                const i = {};
                i[t] = o, i[e] = o, this._vdom ? (this._vdom = n(this._vdom, i), r(this._vdom, this._root)) : (this._props || (this._props = {}), this._props[t] = o, this._props[e] = o)
            },
            configurable: !0,
            enumerable: !0
        })
    }));
    return customElements.get(a) ? void 0 : (null === (h = Reflect.defineProperty) || void 0 === h || h.call(Reflect, g, "componentVersion", {
        value: "preact"
    }), ((t, e) => {
        to((() => {
            customElements.define(t, e)
        }))
    })(a, g))
}
export {
    D as A, Ut as B, B as F, Kt as M, Ge as R, Ot as S, U as T, z as _, Y as a, v as b, Ht as c, I as d, Ze as e, Vt as f, eo as g, A as h, me as i, Je as j, Tt as k, Xe as l, He as m, L as q, no as r, $t as u, R as x, N as y
};
//# sourceMappingURL=chunk.index_DqGc8uuP.esm.js.map