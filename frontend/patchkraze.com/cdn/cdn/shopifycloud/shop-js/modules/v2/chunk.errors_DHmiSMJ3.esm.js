import {
    t as s
} from "./chunk.casing_CQY6ZJfx.esm.js";
import {
    v as a
} from "./chunk.v4_CSBSzmbm.esm.js";
const e = "undefined" == typeof navigator ? {
    languages: [],
    userAgent: "",
    userAgentData: {},
    userLanguage: "",
    credentials: {}
} : navigator;
class t extends Error {
    constructor(e, t, n = a()) {
        super(e), this.name = t, this.analyticsTraceId = n;
        const r = s(t);
        this.analyticsTraceId = n, this.code = r, this.name = t
    }
}
export {
    t as A, e as i
};
//# sourceMappingURL=chunk.errors_DHmiSMJ3.esm.js.map