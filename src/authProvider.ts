import { AuthBindings } from "@refinedev/core";
import axios from 'axios'
import { axiosInstance } from "@refinedev/simple-rest";
export const TOKEN_KEY = "refine-auth";
export const EXCHANGE_TOKEN = 'refine-pre'
export const USER = 'user'
export const API_URL = "http://localhost:4000";

export { axiosInstance }
export const authProvider: AuthBindings = {
    login: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, data);

            if (response.status === 201) {
                const result = response.data;

                // Save the authentication token to localStorage or state
                localStorage.setItem(EXCHANGE_TOKEN, result.access_token);

                return {
                    success: true,
                    redirectTo: '/verify',
                };
            } else {
                return {
                    success: false,
                    error: {
                        message: 'Login failed',
                        name: 'Invalid username or password',
                    },
                };
            }
        } catch (error) {
            console.error('Error occurred:', error);
            return {
                success: false,
                error: {
                    message: 'Login failed',
                    name: 'Unexpected error',
                },
            };
        }
    },
    register: async ({ email, password }) => {
        try {
            await authProvider.login({ email, password });
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        }
    },
    updatePassword: async () => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            }
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const user = localStorage.getItem(USER);
        if (!user) {
            return null;
        }

        return JSON.parse(user)
    },
};
