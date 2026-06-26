import type { CookieOptions } from "express";

declare global {
  namespace Express {
    interface Request {
      protocol: string;
      hostname: string;
      headers: Record<string, string | string[] | undefined>;
      query: Record<string, string | string[] | undefined>;
      params: Record<string, string>;
      cookies?: Record<string, string>;
      cookie?: (name: string, val: string, options?: CookieOptions) => this;
    }

    interface Response {
      status(code: number): this;
      json(body: any): this;
      send(body: string | Buffer): this;
      set(field: string, value: string): this;
      redirect(url: string): this;
      redirect(status: number, url: string): this;
      cookie(name: string, val: string, options?: CookieOptions): this;
      clearCookie(name: string, options?: any): this;
    }

    interface Application {
      get(path: string, ...handlers: any[]): this;
      post(path: string, ...handlers: any[]): this;
      put(path: string, ...handlers: any[]): this;
      delete(path: string, ...handlers: any[]): this;
      patch(path: string, ...handlers: any[]): this;
      use(...handlers: any[]): this;
    }
  }
}

export {};
