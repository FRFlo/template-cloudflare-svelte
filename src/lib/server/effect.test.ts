import { expect, it } from "vitest";
import { Effect } from "effect";
import { CloudflareEnvironment, runWithCloudflareEnv, type CloudflareEnv } from "./effect";

function createEnvironment(url: string): CloudflareEnv {
	return {
		DATABASE: {} as D1Database,
		ASSETS: {} as Fetcher,
		BETTER_AUTH_SECRET: "unit-test-secret",
		BETTER_AUTH_URL: url,
	};
}

it("fournit l’environnement Cloudflare pour la requête courante", async () => {
	const readUrl = Effect.gen(function* () {
		const environment = yield* CloudflareEnvironment;
		return environment.BETTER_AUTH_URL;
	});

	await expect(
		runWithCloudflareEnv(createEnvironment("https://alpha.example"), readUrl),
	).resolves.toBe("https://alpha.example");
	await expect(
		runWithCloudflareEnv(createEnvironment("https://beta.example"), readUrl),
	).resolves.toBe("https://beta.example");
});
