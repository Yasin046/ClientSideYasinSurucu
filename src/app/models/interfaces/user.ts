export interface User {
    username: string;
    role: 'RECEPTIONIST' | 'VET' | 'ADMIN';
    token: string;
}
