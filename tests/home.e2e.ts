import { expect, test } from "@playwright/test";

test("la page d’accueil s’affiche correctement avec son titre", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("h1")).toBeVisible();
});
