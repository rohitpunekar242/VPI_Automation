import { test } from '../fixtures/pages';

test.describe('Full VPI Panel', () => {
  test('TC-001 loads the Full VPI Panel page', async ({ fullVpiPanelPage, page }, testInfo) => {
    await test.step('Open Full VPI Panel page', async () => {
      await fullVpiPanelPage.open();
    });

    await test.step('Wait for Full VPI Panel table data to load', async () => {
      await fullVpiPanelPage.expectLoaded();
    });

    await test.step('Capture final loaded table screenshot', async () => {
      await testInfo.attach('Loaded Full VPI Panel table', {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png'
      });
    });
  });

  test('TC-002 verifies patient list and table columns', async ({ fullVpiPanelPage }) => {
    await test.step('Open Full VPI Panel page', async () => {
      await fullVpiPanelPage.open();
    });

    await test.step('Confirm patient list is displayed', async () => {
      await fullVpiPanelPage.expectLoaded();
      await fullVpiPanelPage.expectPatientListDisplayed();
    });

    await test.step('Confirm patient details and table columns are displayed', async () => {
      await fullVpiPanelPage.expectPatientListColumnsDisplayed();
    });
  });
});
