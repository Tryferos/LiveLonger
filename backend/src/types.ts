

import express, { Express, Request, Response } from "express";
import { ErrorNames } from "./constants/ErrorHandling";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

export type TResponse<T = ResponseProps> = Response<T, TUser>;

export type TRequest<B = any, Q = any, P = any> = Request<P, any, B, Q>;

export type ResponseProps = {
    success: boolean;
    error?: string;
}

export type TUser = {
    user: UserRecord | null; 
}

export type ErrorMiddlewareType = {
    [key in keyof typeof ErrorNames]: ErrorMiddlewareTypeProps
}

export type ErrorMiddlewareTypeProps = {
    error: string;
    message: string
}

export type DateQuery = {
    date: string;
}

export type PaginationQuery = {
    date: string;
}