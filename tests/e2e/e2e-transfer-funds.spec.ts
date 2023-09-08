import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe.parallel("Transfer Funds and Make Payments", () => {
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

    test("Transfer funds",async ({page}) => {
        const transferFromInput = page.locator("#tf_fromAccountId")
        const transferFromValue = "Checking"
        const transferFromOption = "2"
        const transferToInput = page.locator("#tf_toAccountId")
        const transferToValue = "Savings"
        const transferToOption = "3"
        const transferAmountInput = page.locator("input#tf_amount")
        const transferAmountValue = "500"
        const transferDescriptionInput = page.locator("input#tf_description")
        const transferDescription = "Test transfer"
        const submitButton = page.locator("button#btn_submit")
        const verifyPageHeader = page.locator("h2.board-header")
        const confirmPageHeader = verifyPageHeader
        const confirmAlertMessage = page.locator(".alert-success")
        await page.click("li#transfer_funds_tab")
        await transferFromInput.selectOption(transferFromOption)
        await transferToInput.selectOption(transferToOption)
        await transferAmountInput.type(transferAmountValue)
        await transferDescriptionInput.type(transferDescription)
        await submitButton.click()

        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-verify.html")
        await expect(verifyPageHeader).toHaveText("Transfer Money & Make Payments - Verify")
        await expect(transferFromInput).toHaveValue(transferFromValue)
        await expect(transferToInput).toHaveValue(transferToValue)
        await expect(transferAmountInput).toHaveValue(transferAmountValue)
        await expect(transferDescriptionInput).toHaveValue(transferDescription)

        await submitButton.click()
        
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-confirm.html")
        await expect(confirmPageHeader).toHaveText("Transfer Money & Make Payments - Confirm")
        await expect(confirmAlertMessage).toHaveText("You successfully submitted your transaction.")

        const resultRows = page.locator(".board-content .row")
        const fromConfirmValue = resultRows.first().locator(".span3")
        const toConfirmValue = resultRows.nth(1).locator(".span3")
        const amountConfirmValue =  resultRows.last().locator(".span3")

        await expect(fromConfirmValue).toHaveText(transferFromValue)
        await expect(toConfirmValue).toHaveText(transferToValue)
        await expect(amountConfirmValue).toContainText(transferAmountValue)
    })
})