import { Context } from "oak";

const loggerMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  await next();
  const reqTime = ctx.response.headers.get("X-Response-Time");
  const reqId = ctx.response.headers.get("X-Response-Id") ||
    ctx.state.x_response_id;
  const status = ctx.response.status;
  console.log(
    `${reqId} ${ctx.request.method} ${ctx.request.url} - ${reqTime} status: ${status}`,
  );
};

export { loggerMiddleware };
