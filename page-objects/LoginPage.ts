import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage  extends AbstractPage{
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator("input#user_login")
        this.passwordInput = page.locator("input#user_password")
        this.submitButton = page.locator("input[type='submit'][value='Sign in']")
        this.errorMessage = page.locator(".alert-error")
        this.loginForm = page.locator("#login_form")
    }

    async login(
        username: string, 
        password: string, 
        valid: boolean = true) {
            await this.usernameInput.type(username)
            await this.passwordInput.type(password)
            await this.submitButton.click()

        // issue due to https ssl version on site, so opening next page by force
        if(valid === true) {
            await this.page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
            await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/account-summary.html")
        } else {
            await expect(this.page).toHaveURL("http://zero.webappsecurity.com/login.html?login_error=true")
        }
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toBeVisible()
        await expect(this.errorMessage).toHaveText(
            "Login and/or password are wrong.")
    }

    async snapshotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot("login.form.png")
    }

    async snapshotErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot("login-error.png")
    }
}