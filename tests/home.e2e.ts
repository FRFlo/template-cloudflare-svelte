import { expect, test } from "@playwright/test";

test("la page d’accueil s’affiche correctement avec son titre", async ({ page }) => {
	const response = await page.goto("/");

	expect(response?.status()).toBe(200);
	await expect(page.locator("h1")).toBeVisible();
	await expect(page.locator("main")).toContainText("SvelteKit 5");
	await expect(page.locator("main")).toContainText("Tailwind CSS 4");
	await expect(page.locator("main")).toContainText("Cloudflare Workers");
	await expect(page.locator("main")).toContainText("D1 + Better Auth");
	await expect(page.locator("main")).toContainText("Effect");
	await expect(page.locator("main")).toContainText("Paraglide i18n");
});
