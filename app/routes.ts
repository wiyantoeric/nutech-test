import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    // Guest routes
    layout("layouts/guestLayout.tsx", [
        route("register", "pages/auth/register.tsx"),
        route("login", "pages/auth/login.tsx"),
    ]),

    // Authenticated routes
    layout("layouts/authLayout.tsx", [
        ...prefix("app", [
            index("pages/app/home.tsx"),
            route("top-up", "pages/app/topup.tsx"),
            route("service/:serviceCode", "pages/app/service.tsx"),
            route("transactions", "pages/app/transactions.tsx"),
            
            route("account", "pages/app/account.tsx"),

            // route("transactions/:transaction", "pages/app/topup.tsx"),
        ])
    ]),
] satisfies RouteConfig;
