import { RequestHandler } from "express";

export type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export interface ControllerAdapter {
  path: string;
  method: HttpMethod;
  beforeMiddlewares: RequestHandler[];
  handler: RequestHandler;
  afterMiddlewares: RequestHandler[];
}

export interface MiddlewareAdapter {
  execute: RequestHandler;
}
