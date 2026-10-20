import { expect, test } from "@playwright/test";

test("la page d’erreur 404 s’affiche correctement sur une route inconnue", async ({ page }) => {
	const response = await page.goto("/cette-route-n-existe-pas-404");
	expect(response?.status()).toBe(404);
	await expect(page.locator("h1")).toBeVisible();
	await expect(page.getByText("404")).toBeVisible();
});
