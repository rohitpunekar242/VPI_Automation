# Test Writing Guidelines

Use this structure for every automated test so any team member can quickly understand what is covered.

## Test Naming

Write test names as the business behavior being automated.

Good:

```ts
test('allows a user to submit a completed VPI panel', async ({ fullVpiPanelPage }) => {
});
```

Avoid vague names:

```ts
test('test case 1', async ({ page }) => {
});
```

## Test Steps

Wrap every meaningful user action or validation in `test.step()`. These steps appear in Playwright reports and make the script readable.

```ts
test('loads the configured base URL', async ({ fullVpiPanelPage }) => {
  await test.step('Open the VPI full panel page', async () => {
    await fullVpiPanelPage.open();
  });

  await test.step('Verify the VPI full panel page is loaded', async () => {
    await fullVpiPanelPage.expectLoaded();
  });
});
```

## Page Object Model

Keep selectors, clicks, typing, and page-specific assertions inside page classes under `pages/`.

Tests should describe the scenario:

```ts
await fullVpiPanelPage.open();
await fullVpiPanelPage.expectLoaded();
```

Page objects should contain implementation details:

```ts
async expectLoaded(): Promise<void> {
  await expect(this.page).toHaveURL(/full-vpi-panel/);
}
```

## Recommended Test Layout

```ts
import { test } from '../fixtures/pages';

test.describe('Feature name', () => {
  test('business behavior being automated', async ({ pageObjectName }) => {
    await test.step('Step 1: describe user action', async () => {
      await pageObjectName.performAction();
    });

    await test.step('Step 2: describe expected result', async () => {
      await pageObjectName.expectResult();
    });
  });
});
```

## Mapping Manual Test Cases

When automating from a manual test case, include the test case ID in the title if one exists.

```ts
test('TC-1024 allows a user to submit a completed VPI panel', async ({ fullVpiPanelPage }) => {
});
```

This makes it easy to search the codebase and confirm whether a manual scenario is automated.
