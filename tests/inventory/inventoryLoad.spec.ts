import { test } from '@playwright/test';
import { LoginPage } from '../../pages_view_logic/loginPage';
import { InventoryPage } from '../../pages_view_logic/inventoryPage';
import { testData } from '../../dynamic_source/testData';

test('Verify Inventory Page loads after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await inventoryPage.verifyInventoryPageLoaded();
});
