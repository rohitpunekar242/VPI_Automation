# VPI Automation
Veradigm Payer Insights (VPI) is a clinical decision support solution platform


Playwright + TypeScript automation project.

## Setup

```bash
npm install
npx playwright install
```

Create a local `.env` file if you want to override the default base URL:

```bash
BASE_URL=https://your-application-url
```

## Commands

```bash
npm test
npm run test:headed
npm run test:ui
npm run test:debug
npm run report
npm run codegen
```

Run in headed mode:

```bash
npm test -- --headed
```

## Test Structure

- `pages/`: Page Object Model classes. Put locators and page-level actions here.
- `fixtures/`: Reusable Playwright fixtures that provide page objects to tests.
- `tests/`: Test specs. Keep tests focused on business flow and assertions, not selector details.
- `docs/`: Project testing conventions and team guidelines.

Use the POM fixture in specs:

```ts
import { test } from '../fixtures/pages';

test('loads the Full VPI Panel page', async ({ fullVpiPanelPage }) => {
  await test.step('Open the VPI full panel page', async () => {
    await fullVpiPanelPage.open();
  });

  await test.step('Verify the VPI full panel page is loaded', async () => {
    await fullVpiPanelPage.expectLoaded();
  });
});
```

See `docs/test-writing-guidelines.md` for naming, test step, and manual test case mapping conventions.
