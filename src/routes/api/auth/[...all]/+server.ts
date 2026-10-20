import type { RequestHandler } from "./$types";
import { Effect } from "effect";
import { handleAuthRequest } from "#lib/server/auth";
import { getCloudflareEnvironment, runWithCloudflareEnv } from "#lib/server/effect";

const handle: RequestHandler = async ({ request, platform }) => {
	const cloudflareEnv = getCloudflareEnvironment(platform?.env);

	if (!cloudflareEnv) {
		return new Response("Cloudflare environment is unavailable", { status: 500 });
	}

	const program = Effect.catch(handleAuthRequest(request), (error) => {
		console.error(error);
		return Effect.succeed(new Response("Internal Server Error", { status: 500 }));
	});

	return runWithCloudflareEnv(cloudflareEnv, program);
};

export const GET = handle;
export const POST = handle;
