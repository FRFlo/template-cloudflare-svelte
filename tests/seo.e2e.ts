import { expect, test } from "@playwright/test";

test("la page d’accueil contient les balises Open Graph, Twitter et canonical", async ({
	page,
}) => {
	await page.goto("/");

	await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/);
	await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /.+/);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		"content",
		/og-image\.png/,
	);
	await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
		"content",
		"summary_large_image",
	);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /.+/);
});

test("robots.txt et sitemap.xml sont accessibles et valides", async ({ page }) => {
	const robots = await page.goto("/robots.txt");
	expect(robots?.status()).toBe(200);
	const robotsText = await robots?.text();
	expect(robotsText).toContain("Sitemap: /sitemap.xml");

	const sitemap = await page.goto("/sitemap.xml");
	expect(sitemap?.status()).toBe(200);
	expect(sitemap?.headers()["content-type"]).toContain("application/xml");
	const sitemapText = await sitemap?.text();
	expect(sitemapText).toContain("<urlset");
	expect(sitemapText).toContain("<loc>");
});
