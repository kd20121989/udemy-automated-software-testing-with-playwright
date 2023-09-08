import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe.parallel("Login / Logout Flow", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    let username: string = "username"
    let password: string = "password"
    let invalidUsername: string = "invalid username"
    let invalidPassword: string = "invalid password"

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
    })

    test("Positive scenario for login + logout", async ({ page }) => {
        await loginPage.login(username, password)
        // issue due to https ssl version, so opening next page by force
        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
        const accountSummaryTab = await page.locator("#account_summary_tab")
        await expect(accountSummaryTab).toBeVisible()
        await page.locator("//a[normalize-space()='username']").click()
        await page.click("#logout_link")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })

    test("Negative Scenario for login",async ({ page }) => {
        await loginPage.login(invalidUsername, invalidPassword, false)
        await loginPage.assertErrorMessage()
    })
})