import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryTitle;
    readonly inventoryItems;
    readonly sortDropdown;

    constructor(page: Page) {
        this.page = page;

        // Define locators *after* assigning page
        this.inventoryTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    }

    async verifyInventoryPageLoaded() {
        await expect(this.page).toHaveURL(/.*inventory\.html/);
        await expect(this.inventoryTitle).toBeVisible();
        await expect(this.inventoryItems.first()).toBeVisible();
    }

    async getProductNames(): Promise<string[]> {
        return await this.page.$$eval('.inventory_item_name', els =>
            els.map(el => el.textContent?.trim() || '')
        );
    }

    async getProductPrices(): Promise<number[]> {
        return await this.page.$$eval('.inventory_item_price', els =>
            els.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
        );
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async openProductByName(productName: string) {
        await this.page.click(`text=${productName}`);
    }
}
