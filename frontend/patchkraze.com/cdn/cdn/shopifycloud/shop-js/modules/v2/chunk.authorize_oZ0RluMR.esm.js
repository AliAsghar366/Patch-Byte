import {
    i as o
} from "./chunk.window_BV7pwtSs.esm.js";
const t = function(o) {
        const t = function(o) {
            if (o.match(/\.shop\.dev$/) && "web-shop-client.shop.dev" !== o) return "shop.dev"
        }(o.hostname);
        return t ? {
            coreAuthDomain: `https://shop1.my.${t}`,
            payAuthDomain: `https://shop-server.${t}`,
            payAuthDomainAlt: `https://pay-shopify-com.${t}`
        } : {
            coreAuthDomain: o.origin,
            payAuthDomain: "https://shop.app",
            payAuthDomainAlt: "https://pay.shopify.com"
        }
    }(o.location),
    p = t.coreAuthDomain,
    a = t.payAuthDomain,
    h = t.payAuthDomainAlt;
export {
    p as C, a as P, h as a
};
//# sourceMappingURL=chunk.authorize_oZ0RluMR.esm.js.map