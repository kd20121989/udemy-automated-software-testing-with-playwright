import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe.parallel("Check account activity", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    let username: string = "username"
    let password: string = "password"

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login(username, password)
    })

    test("Check transactions for each account",async ({ page }) => {
        const transactionsResult = page.locator("#all_transactions_for_account")
        const transactionsNoResults = transactionsResult.locator(".well")
        const transactionsTable = transactionsResult.locator("table.table")
        const transactionsTableRows = transactionsTable.locator("tbody tr")
        const accountSelectOptions = page.locator("select#aa_accountId")
        await page.click("#account_activity_tab")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/account-activity.html")
        await expect(page.locator("h2.board-header")).toHaveText("Show Transactions")
        await transactionsTable.waitFor()
        await expect(transactionsTableRows).toHaveCount(3)
        
        await accountSelectOptions.selectOption("2")
        await transactionsTable.waitFor()
        await expect(transactionsTableRows).toHaveCount(3)

        await accountSelectOptions.selectOption("4")
        await transactionsTable.waitFor()
        await expect(transactionsTableRows).toHaveCount(2)

        await accountSelectOptions.selectOption("6")
        await expect(transactionsNoResults).toBeVisible()
        await expect(transactionsNoResults).toHaveText("No results.")
        await expect(transactionsTable).not.toBeVisible()
    })
})