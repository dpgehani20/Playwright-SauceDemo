import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { testData } from '../../utils/testData';

test.describe('SauceDemo Login Page Tests', () => {

  // 001 - Verify login logo
  test('Verify login logo display as "Swag Labs"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
  });

  // 002 - Verify placeholders
  test('Verify text fields placeholder display as "Username" and "Password"', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#user-name')).toHaveAttribute('placeholder', 'Username');
    await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Password');
  });

  // 003 - Verify Login button display
  test('Verify "Login" button display in login page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#login-button')).toBeVisible();
  });

  // 004 - Valid login
  test('Verify user can login with correct username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // 005 - Correct username, wrong password
  test('Verify user cannot login with correct username and wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.wrongPasswordUser.username, testData.wrongPasswordUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  // 006 - Incorrect username, correct password
  test('Verify user cannot login with incorrect username and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.invalidUser.username, testData.validUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  // 007 - Incorrect username and password
  test('Verify user cannot login with incorrect username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  // 008 - Correct username, empty password
  test('Verify user cannot login with correct username and empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.emptyPasswordUser.username, testData.emptyPasswordUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Password is required');
  });

  // 009 - Empty username, correct password
  test('Verify user cannot login with empty username and correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.emptyUsernameUser.username, testData.emptyUsernameUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Username is required');
  });

  // 010 - Empty username and password
  test('Verify user cannot login with empty username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.emptyUsernamePassword.username, testData.emptyUsernamePassword.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Username is required');
  });

  // 011 - Locked user
  test('Verify locked out user cannot login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);
    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

});
