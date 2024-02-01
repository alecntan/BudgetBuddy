export type FormResponse<T> = {
    isRedirect: boolean;
    redirectUrl: string;
    result: T;
    isError: boolean;
    message: string;
}
