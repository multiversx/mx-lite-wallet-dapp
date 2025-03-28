import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 3,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 75000,
  webServer: {
    command: 'npm run vite preview',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: 'https://localhost:3000',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
