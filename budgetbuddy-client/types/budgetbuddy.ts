export type UserProfile = {
    first_name: string;
    last_name: string;
    user_role: UserRole;
};

export type UserRole = "admin" | "director" | "manager" | "associate";

export type FormResponse<T> = {
    isRedirect: boolean;
    redirectUrl: string;
    result: T;
    isError: boolean;
    message: string;
}

