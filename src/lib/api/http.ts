import axios, { type AxiosError } from "axios";
import { toast } from "sonner";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const http = axios.create({
    baseURL,
    withCredentials: true, // ✅ IMPORTANT for cookies
});

// ================================
// GLOBAL RESPONSE ERROR HANDLER
// ================================
http.interceptors.response.use(
    (response) => response,

    (error: AxiosError<{ message?: string }>) => {
        // Only run in browser (not during SSR)
        if (typeof window === "undefined") {
            return Promise.reject(error);
        }

        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message;

            switch (status) {
                case 401:
                    // Clear auth state
                    localStorage.removeItem("currentUser");

                    // Prevent redirect loop
                    if (window.location.pathname !== "/login") {
                        toast.error("Session expired. Please log in again.");
                        window.location.href = "/login";
                    }
                    break;

                case 403:
                    toast.error(message || "You don't have permission to do that.");
                    break;

                case 404:
                    toast.error(message || "Resource not found.");
                    console.error("404 Not Found:", error.message);
                    break;

                case 500:
                    toast.error("Server error. Please try again later.");
                    console.error("500 Internal Error:", error);
                    break;

                default:
                    // Handle other 4xx/5xx errors
                    if (status >= 400) {
                        toast.error(message || "Something went wrong.");
                    }
            }
        } else if (error.request) {
            // Network error (no response received)
            toast.error("Network error. Please check your connection.");
            console.error("No response from server:", error.message);
        } else {
            // Request setup error
            toast.error("An unexpected error occurred.");
            console.error("Request setup error:", error.message);
        }

        return Promise.reject(error);
    }
);