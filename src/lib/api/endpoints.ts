

export const endpoints = {
    auth: {
        login: "/api/v1/auth/login",
        register: "/api/v1/auth/register",
        forgotPassword: "/api/v1/auth/forgot-password",
        resetPassword: "/api/v1/auth/reset-password",
        // recommended later (optional): me: "/api/v1/auth/me",
        // recommended later (optional): logout: "/api/v1/auth/logout",
    },
    profile: {
        me: "/api/v1/profile",
    },
    products: {
        list: "/api/v1/products",
        byId: (id: string | number) => `/api/v1/products/${id}`,
    },
    categories: {
        list: "/api/categories",
        byId: (id: string | number) => `/api/categories/${id}`,
    },
    cart: {
        get: "/api/v1/cart",
        add: "/api/v1/cart/add",
        remove: (cartItemId: string | number) => `/api/v1/cart/remove/${cartItemId}`,
        clear: "/api/v1/cart/clear",
    },
    orders: {
        list: "/api/v1/orders",
        create: "/api/v1/orders",
    },
    contacts: {
        create: "/api/v1/contacts",
    },
    admin: {
        products: {
            listCreate: "/api/v1/admin/products",
            updateDelete: (id: string | number) => `/api/v1/admin/products/${id}`,
            uploadImage: (productId: string | number) =>
                `/api/v1/admin/products/${productId}/upload-image`,
            deleteImage: (publicId: string) => `/api/v1/admin/products/images/${publicId}`,
        },
        orders: {
            list: "/api/v1/admin/orders",
            confirm: (orderId: string | number) => `/api/v1/admin/orders/${orderId}/confirm`,
            cancel: (orderId: string | number) => `/api/v1/admin/orders/${orderId}/cancel`,
        },
        messages: {
            list: "/api/v1/admin/messages",
            close: (contactId: string | number) => `/api/v1/admin/messages/${contactId}/close`,
        },
        discounts: {
            create: "/api/v1/admin/discounts",
            byProduct: (productId: string | number) =>
                `/api/v1/admin/discounts/product/${productId}`,
        },
    },
} as const;
