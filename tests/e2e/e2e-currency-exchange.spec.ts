import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"


test.describe.parallel("Exchange currency", () => {
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

    test("Exchange EUR to USD",async ({ page }) => {
        const payBillsTab = page.locator("li#pay_bills_tab")
        const purchaseForeignCurrencyTab = page.locator("ul.ui-tabs-nav").getByText("Purchase Foreign Currency")
        const tabHeader = page.getByRole('heading', { name: 'Purchase foreign currency cash' })
        const currencyOptions = page.locator("select#pc_currency")
        const sellRateHelp = page.locator("p.help-block")
        const sellRateString = sellRateHelp.locator("#sp_sell_rate")
        const sellRateRegexp = /^1 euro \(EUR\) = (\d+\.\d{4}) U\.S\. dollar \(USD\)$/
        const amountInput = page.locator("input#pc_amount")
        const amountValue = "150"
        const amountValueFloat = parseFloat(amountValue)
        const toUSDRadio = page.locator("input#pc_inDollars_true")
        const calculateCostsButton = page.locator("input#pc_calculate_costs")
        const conversionAmountString = page.locator("label#pc_conversion_amount")
        const conversionAmountRegexp = /(\d+\.\d{2}) euro \(EUR\) = (\d+\.\d{2}) U\.S\. dollar \(USD\)/
        const purchaseButton = page.locator("input#purchase_cash")
        const resultAlert = page.locator("div#alert_content")


        await payBillsTab.click()
        await purchaseForeignCurrencyTab.click()

        await expect(tabHeader).toBeVisible()
        await expect(tabHeader).toHaveText("Purchase foreign currency cash")
        await currencyOptions.selectOption("EUR")
        await expect(sellRateString).toBeVisible()

        const sellRateStringText = await sellRateString.textContent()
        expect(sellRateStringText).toMatch(sellRateRegexp)
        const rateMatchFloat = sellRateStringText?.match(sellRateRegexp)

        const sellRateFloat = parseFloat(rateMatchFloat?.[1] || "0")
        // console.log({sellRateFloat}); // should print the float number, e.g., 1.3862

        await amountInput.type(amountValue)
        await toUSDRadio.click()
        await calculateCostsButton.click()
        await conversionAmountString.waitFor()
        const conversionAmountStringText = await conversionAmountString.textContent()
        expect(conversionAmountStringText).toMatch(conversionAmountRegexp)
        const conversionMatchFloatList = conversionAmountStringText?.match(conversionAmountRegexp)


        const conversionAmountEurFloat = parseFloat(conversionMatchFloatList?.[1] || "0")
        const conversionAmountUSDFloat = parseFloat(conversionMatchFloatList?.[2] || "0")
        // console.log({conversionAmountEurFloat}, {conversionAmountUSDFloat})

        expect(conversionAmountEurFloat).toEqual(parseFloat((amountValueFloat / sellRateFloat).toFixed(2)))
        expect(conversionAmountUSDFloat).toEqual(amountValueFloat)

        await purchaseButton.click()
        await expect(resultAlert).toBeVisible()
        await expect(resultAlert).toHaveText("Foreign currency cash was successfully purchased.")
    })
})