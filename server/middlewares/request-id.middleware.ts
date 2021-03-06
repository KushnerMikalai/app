import { Context } from "oak";
import { v4 as uuid } from "uuid";

const requestIdMiddleware = async (
  ctx: Context,
  next: () => Promise<unknown>,
) => {
  const requestId = ctx.request.headers.get("X-Response-Id");
  if (!requestId) {
    const newRequestId = uuid.generate();
    ctx.state.x_response_id = newRequestId.toString();
    // ctx.request.headers.set("X-Response-Id", requestId.toString())
  } else {
    ctx.state.x_response_id = requestId;
  }
  await next();
};

export { requestIdMiddleware };
