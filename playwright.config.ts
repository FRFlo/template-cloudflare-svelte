import { defineConfig } from "@playwright/test";

export default defineConfig({
	webServer: {
		command: "bun run preview",
		port: 4173,
		timeout: 120_000,
		reuseExistingServer: !process.env.CI,
	},
	use: { baseURL: "http://127.0.0.1:4173" },
	testMatch: "**/*.e2e.{ts,js}",
});
