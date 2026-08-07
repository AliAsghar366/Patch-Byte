function e(e, r) {
    var t = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && r.indexOf(n) < 0 && (t[n] = e[n]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) r.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (t[n[o]] = e[n[o]])
    }
    return t
}

function r(e, r, t, n) {
    return new(t || (t = Promise))((function(o, a) {
        function c(e) {
            try {
                s(n.next(e))
            } catch (e) {
                a(e)
            }
        }

        function i(e) {
            try {
                s(n.throw(e))
            } catch (e) {
                a(e)
            }
        }

        function s(e) {
            var r;
            e.done ? o(e.value) : (r = e.value, r instanceof t ? r : new t((function(e) {
                e(r)
            }))).then(c, i)
        }
        s((n = n.apply(e, r || [])).next())
    }))
}

function t(e, r, t, n) {
    if ("a" === t && !n) throw new TypeError("Private accessor was defined without a getter");
    if ("function" == typeof r ? e !== r || !n : !r.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return "m" === t ? n : "a" === t ? n.call(e) : n ? n.value : r.get(e)
}

function n(e, r, t, n, o) {
    if ("m" === n) throw new TypeError("Private method is not writable");
    if ("a" === n && !o) throw new TypeError("Private accessor was defined without a setter");
    if ("function" == typeof r ? e !== r || !o : !r.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return "a" === n ? o.call(e, t) : o ? o.value = t : r.set(e, t), t
}

function o(e) {
    return e.replace(/[-:_]([a-z])/g, ((e, r) => `${r.toUpperCase()}`))
}

function a(e) {
    return e.replace(/([a-z0-9])([A-Z])/g, ((e, r, t) => `${r}-${t.toLowerCase()}`)).replace(/[\s_]+/g, "-")
}

function c(e) {
    return e.replace(/[A-Z]/g, (e => `_${e.toLowerCase()}`)).replace(/^_/, "")
}
"function" == typeof SuppressedError && SuppressedError;
export {
    e as _, r as a, n as b, t as c, a as d, o as e, c as t
};
//# sourceMappingURL=chunk.casing_CQY6ZJfx.esm.js.map