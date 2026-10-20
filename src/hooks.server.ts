import type { Handle } from "@sveltejs/kit/hooks";
import { sequence } from "@sveltejs/kit/hooks";
import { getTextDirection } from "#lib/paraglide/runtime";
import { paraglideMiddleware } from "#lib/paraglide/server";
import { getSession } from "#lib/server/auth";
import { runWithCloudflareEnv } from "#lib/server/effect";
import { Effect } from "effect";

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		return resolve(
			{ ...event, request },
			{
				transformPageChunk: ({ html }) =>
					html
						.replace("%paraglide.lang%", locale)
						.replace("%paraglide.dir%", getTextDirection(locale)),
			},
		);
	});

const handleAuth: Handle = async ({ event, resolve }) => {
	if (!event.platform?.env) {
		event.locals.session = null;
		event.locals.user = null;
		return resolve(event);
	}

	const sessionProgram = Effect.catch(getSession(event.request), (error: unknown) => {
		console.error("Session lookup error:", error);
		return Effect.succeed(null);
	});

	const sessionData = await runWithCloudflareEnv(event.platform.env, sessionProgram);

	event.locals.session = sessionData?.session ?? null;
	event.locals.user = sessionData?.user ?? null;

	return resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleAuth);
