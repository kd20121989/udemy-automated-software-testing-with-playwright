import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage{
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly feedbackLink: Locator

    constructor(page: Page) {
        super(page)
        this.signInButton = page.locator("button#signin_button")
        this.searchBox = page.locator("input#searchTerm.search-query[placeholder='Search']")
        this.feedbackLink = page.locator("li#feedback")
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/")
    }

    async clickOnSignInButton() {
        await this.signInButton.click()
    }

    async clickOnFeedbackLink() {
        await this.feedbackLink.click()
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/feedback.html")
    }

    async searchFor(phrase: string) {
        await this.searchBox.type(phrase)
        await this.page.keyboard.press("Enter")
    }
}