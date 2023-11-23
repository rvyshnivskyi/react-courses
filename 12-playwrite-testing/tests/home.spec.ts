import {expect, test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('verify that "Home" page has correct title', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Home' })

    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Home');
});

test('verify that "Home" page has correct menu items', async ({ page }) => {
    const expectedMenuItems = ['Home', 'Waiters']
    const menuItems = page.locator('nav a')

    expect(await menuItems.allTextContents()).toEqual(expectedMenuItems)
});