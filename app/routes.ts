import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    // route("*", "src/layouts/ErrorLayout.tsx"),

    // Guest routes
    layout("src/layouts/guestLayout.tsx", [
        index("src/features/HomePage.tsx"),
        route("register", "src/features/auth/RegisterPage.tsx"),
        route("login", "src/features/auth/LoginPage.tsx"),
    ]),

    // Authenticated routes
    layout("src/layouts/authLayout.tsx", [
        ...prefix("app", [
            index("src/features/app/HomePage.tsx"),
            route("top-up", "src/features/wallet/TopUpPage.tsx"),
            route("service/:serviceCode", "src/features/transaction/ServicePage.tsx"),
            route("transactions", "src/features/transaction/TransactionPage.tsx"),

            route("account", "src/features/auth/AccountPage.tsx"),

            // route("transactions/:transaction", "src/features/auth/topup.tsx"),
        ])
    ]),
] satisfies RouteConfig;
