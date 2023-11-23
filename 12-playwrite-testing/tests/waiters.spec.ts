import {expect, test} from '@playwright/test';

const HEADER_COUNT = 1;

const MOCK_WAITERS = [
    {
        id: 1,
        firstName: 'John',
        phone: '1234567890',
    },
    {
        id: 2,
        firstName: 'Jane',
        phone: '0987654321',
    },
];
test.beforeEach(async ({ page }) => {
    await page.route('http://localhost:4000/waiters', async route => {
        await route.fulfill({ json: MOCK_WAITERS });
    });

    await page.goto('http://localhost:3000/waiters');
});

test('verify that "Waiters" page has correct title', async ({ page }) => {
    const pageTitle = 'Waiters'

    const heading = page.getByRole('heading', { name: pageTitle })

    await expect(heading).toBeVisible();
    await expect(heading).toContainText(pageTitle);
});

test('verify that "Waiters List" is shown', async ({ page }) => {
    const progressbar = page.getByRole('progressbar')

    await expect(progressbar).not.toBeVisible();

    const rows = page.getByRole('row')

    await expect(rows).toHaveCount(2 + HEADER_COUNT);
});

test('verify that "Waiters List" is filtered by first name', async ({ page }) => {
    const progressbar = page.getByRole('progressbar')

    await expect(progressbar).not.toBeVisible();

    const nameQueryHeader = page.getByText('First Name');
    const nameQueryInput = page.getByRole('columnheader').filter({ has: nameQueryHeader }).getByRole('textbox')
    await nameQueryInput.fill('John')

    const rows = page.getByRole('row')
    await expect(rows).toHaveCount(1 + HEADER_COUNT);
});

test('verify delete button makes DELETE request', async ({ page }) => {
    const progressbar = page.getByRole('progressbar')
    await expect(progressbar).not.toBeVisible();

    const secondRow = page.getByRole('row').nth(2)
    const secondRowWaiterId = await secondRow.getAttribute('data-id')

    await page.route('http://localhost:4000/waiters/' + secondRowWaiterId, async route => {
        if (route.request().method() === 'DELETE') {
            await route.fulfill({ status: 200, json: {} })
        }
    });

    const deleteButton = secondRow.getByRole('button', { name: 'Delete' })
    await deleteButton.click()

    const rows = page.getByRole('row')
    await expect(rows).toHaveCount(1 + HEADER_COUNT);
});