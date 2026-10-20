import { Context, Effect } from "effect";
import { env as cfWorkersEnv } from "cloudflare:workers";

export type CloudflareEnv = Env & {
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;
};

export class CloudflareEnvironment extends Context.Service<CloudflareEnvironment, CloudflareEnv>()(
	"app/CloudflareEnvironment",
) {}

/**
 * Résout l'environnement Cloudflare :
 * 1. Depuis `platform.env` s'il est présent (SSR/Worker en production ou preview)
 * 2. Depuis le module `cloudflare:workers` (émulé par Wrangler/Miniflare via `getPlatformProxy` en mode dev Vite)
 */
export function getCloudflareEnvironment(platformEnv?: Env | null): CloudflareEnv | null {
	const source = platformEnv ?? (cfWorkersEnv as unknown as Env);
	if (!source || Object.keys(source).length === 0) {
		return null;
	}
	return source as CloudflareEnv;
}

export function runWithCloudflareEnv<A, E>(
	env: CloudflareEnv,
	program: Effect.Effect<A, E, CloudflareEnvironment>,
): Promise<A> {
	return Effect.runPromise(Effect.provideService(program, CloudflareEnvironment, env));
}
