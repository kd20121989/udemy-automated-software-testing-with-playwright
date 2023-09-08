import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe.parallel.only("Login Page Visual Tests", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignInButton()
    })

    test("Login Form",async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test("Login Error Message",async ({ page }) => {
        await loginPage.login("invalid name", "wrong password", false)
        await loginPage.snapshotErrorMessage()
    })
})