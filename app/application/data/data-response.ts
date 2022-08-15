export type DataResponse = {
    status: number,
    data: any,
    errors: ErrorGeneric[]
}

export type ErrorGeneric = {
    message: string
}