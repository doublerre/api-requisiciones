declare namespace Express{
    export interface Request{
        userId: string,
        user: Array,
        roles: Array
    }
}