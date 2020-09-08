declare module 'nestjs-sse' {
  export interface Response {
    sse: any;
    on: any;
  }
  export const SSEMiddleware: any; // TODO learn to write decent d.ts
}
