export type HttpDataResponse<T> = {
    status: number,
    data: T | null,
    errors: ErrorGeneric[]
}

export type ErrorGeneric = {
    message: string
}