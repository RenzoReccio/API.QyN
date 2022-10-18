import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BearerTokenInformation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.BearerTokenSecurity.data;
  },
);