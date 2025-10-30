import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { testData } from '../../utils/testData';

test('Verify Inventory Page loads after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    await inventoryPage.verifyInventoryPageLoaded();
});
