import { betterAuth } from "better-auth";
import { withCloudflare } from "better-auth-cloudflare";
import { Effect } from "effect";
import { CloudflareEnvironment } from "#lib/server/effect";

export function createAuth(env: Env & { BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string }) {
	return betterAuth({
		...withCloudflare(
			{
				d1Native: env.DATABASE,
				autoDetectIpAddress: false,
				geolocationTracking: false,
			},
			{
				secret: env.BETTER_AUTH_SECRET,
				baseURL: env.BETTER_AUTH_URL,
				emailAndPassword: { enabled: true },
			},
		),
	});
}

export function handleAuthRequest(request: Request) {
	return Effect.gen(function* () {
		const env = yield* CloudflareEnvironment;
		const auth = createAuth(env);

		return yield* Effect.tryPromise({
			try: () => auth.handler(request),
			catch: (cause) => new Error("Better Auth request failed", { cause }),
		});
	});
}

export function getSession(request: Request) {
	return Effect.gen(function* () {
		const env = yield* CloudflareEnvironment;
		const auth = createAuth(env);

		return yield* Effect.tryPromise({
			try: () => auth.api.getSession({ headers: request.headers }),
			catch: (cause) => new Error("Failed to retrieve Better Auth session", { cause }),
		});
	});
}
