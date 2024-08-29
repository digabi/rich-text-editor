import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './playwright',

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',

	use: {
		baseURL: 'http://localhost:1234',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
	},

	webServer: {
		command: 'npm run parcel-serve',
		port: 1234,
		reuseExistingServer: !process.env.CI,
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
})
