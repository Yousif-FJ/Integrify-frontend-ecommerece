type User = {
    id: string,
    name: string,
    email: string,
    role: UserRole
}

export type UserRole = "admin" | "user";

export default User;