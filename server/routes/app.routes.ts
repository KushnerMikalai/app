import { Context } from "../deps.ts";
import * as userService from "../services/user.service.ts";

const getAppData = async (ctx: Context) => {
  const stateUserId = ctx.state?.user?.id || null;

  const user = stateUserId ? await userService.getUserById(+stateUserId) : {
    roles: "guest",
  };

  user.isAuth = Boolean(stateUserId);

  ctx.response.body = {
    account: user,
  };
};

export { getAppData };
