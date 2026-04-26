import { test as base } from '@playwright/test';
import { FullVpiPanelPage } from '../pages/FullVpiPanelPage';

type PageFixtures = {
  fullVpiPanelPage: FullVpiPanelPage;
};

export const test = base.extend<PageFixtures>({
  fullVpiPanelPage: async ({ page }, use) => {
    await use(new FullVpiPanelPage(page));
  }
});

export { expect } from '@playwright/test';
