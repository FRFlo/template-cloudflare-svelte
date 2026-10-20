import { Context, Effect } from "effect";

export type CloudflareEnv = Env & {
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;
};

export class CloudflareEnvironment extends Context.Service<CloudflareEnvironment, CloudflareEnv>()(
	"app/CloudflareEnvironment",
) {}

export function runWithCloudflareEnv<A, E>(
	env: CloudflareEnv,
	program: Effect.Effect<A, E, CloudflareEnvironment>,
): Promise<A> {
	return Effect.runPromise(Effect.provideService(program, CloudflareEnvironment, env));
}
