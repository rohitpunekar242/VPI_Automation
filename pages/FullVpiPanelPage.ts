import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FullVpiPanelPage extends BasePage {
  private readonly panelTitle = this.page.getByText('Full VPI Panel', { exact: true });
  private readonly patientColumnHeader = this.page.getByText('Patient', { exact: true });
  private readonly syncingDataIndicator = this.page.getByText('Syncing Data', { exact: true });
  private readonly patientRows = this.page.locator('tbody tr');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/full-vpi-panel/);
    await this.waitForContentReady();
  }

  async expectPatientListDisplayed(): Promise<void> {
    await expect.poll(async () => this.patientRows.count(), {
      message: 'Expected at least one patient row to be displayed'
    }).toBeGreaterThan(0);

    await expect(this.patientRows.first()).toBeVisible();
  }

  async expectPatientListColumnsDisplayed(): Promise<void> {
    const expectedHeaders = ['Patient', 'Gaps', 'Payer / Providers', 'Appointment', 'Appointment State'];

    for (const header of expectedHeaders) {
      await expect(this.page.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
    }

    const firstPatientRowText = await this.patientRows.first().innerText();

    expect(firstPatientRowText, 'Expected patient name to be displayed in the Patient column').toMatch(/[A-Za-z]+,\s*[A-Za-z]/);
    expect(firstPatientRowText, 'Expected MRN to be displayed in the Patient column').toMatch(/MRN:\s*\S+/);
    expect(firstPatientRowText, 'Expected DOB and gender to be displayed in the Patient column').toMatch(
      /\d{4}-\d{2}-\d{2},\s*[A-Za-z]+/
    );
  }

  private async waitForContentReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.panelTitle).toBeVisible();
    await expect(this.patientColumnHeader).toBeVisible();
    await expect(this.syncingDataIndicator).toBeHidden({ timeout: 30000 });

    await this.page.waitForFunction(() => {
      const text = document.body?.innerText ?? '';
      const hasTableHeaders = ['Patient', 'Gaps', 'Payer / Providers', 'Appointment', 'Appointment State'].every((header) =>
        text.includes(header)
      );
      const isStillSyncing = text.includes('Syncing Data');
      const hasSkeleton = document.querySelector('[class*="Skeleton"], [class*="skeleton"], [aria-busy="true"]') !== null;
      const tableText = text
        .replace('Full VPI Panel', '')
        .replace('Filter', '')
        .replace('Export', '')
        .replace('Page Size: 50', '')
        .replace('Patient', '')
        .replace('Gaps', '')
        .replace('Payer / Providers', '')
        .replace('Appointment', '')
        .replace('Appointment State', '')
        .trim();

      return document.readyState === 'complete' && hasTableHeaders && !isStillSyncing && !hasSkeleton && tableText.length > 0;
    }, undefined, { timeout: 30000 });
  }
}
