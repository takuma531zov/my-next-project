import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

export const middleware = createNextAuthMiddleware();

export const config = {
	matcher: ["/(.*)"],
};
// This middleware will protect all routes in the application.
