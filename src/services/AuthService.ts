import { AuthResponse } from '../models/AuthResponse';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

class AuthService {

    async register(
        email: string,
        password: string
    ): Promise<AuthResponse> {

        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || 'Registration failed'
            );
        }

        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('email', data.email);

        return data;
    }


    async login(
        email: string,
        password: string
    ): Promise<AuthResponse> {

        const url =
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error?.message || 'Login failed'
            );
        }

        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('email', data.email);

        return data;
    }


    logout(): void {
        localStorage.removeItem('idToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
    }


    isLoggedIn(): boolean {
        return !!localStorage.getItem('idToken');
    }


    getToken(): string | null {
        return localStorage.getItem('idToken');
    }


    getCurrentUser() {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');

        if (!userId) {
            return null;
        }

        return {
            userId,
            email,
        };
    }
}

export default new AuthService();