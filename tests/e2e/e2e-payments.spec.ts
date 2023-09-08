import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"
import { PaymentPage } from "../../page-objects/PaymentPage"
import { Navbar } from "../../page-objects/components/Navbar"

test.describe.parallel("New payment", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar

    let username: string = "username"
    let password: string = "password"

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
        await loginPage.login(username, password)
    })

    test("Send payment to saved payee",async ({ page }) => {
        await navbar.clickOnTab("Pay Bills")
        await paymentPage.createPayment()
        await paymentPage.assertSuccessPaymentMessage()
    })
})