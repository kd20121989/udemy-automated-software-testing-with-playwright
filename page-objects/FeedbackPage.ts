import { expect, Locator, Page,  } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class FeedbackPage extends AbstractPage{
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly submitButton: Locator
    readonly clearButton: Locator
    readonly feedbackTitle: Locator
    readonly feedbackBody: Locator

    constructor(page: Page) {
        super(page)
        this.nameInput = page.locator("input#name[placeholder='Your Name']")
        this.emailInput = page.locator("input#email[placeholder='Your email address']")
        this.subjectInput = page.locator("input#subject[placeholder='Subject']")
        this.commentInput = page.locator("textarea#comment[placeholder='Type your questions here...']")
        this.submitButton = page.locator("input.btn[type=submit][value='Send Message']")
        this.clearButton = page.locator("input.btn[type=reset][value='Clear']")
        this.feedbackTitle = page.locator("h3#feedback-title")
        this.feedbackBody = page.getByText("Thank you")
    }

    async fillForm(
        name: string, 
        email: string, 
        subject: string, 
        comment: string) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.commentInput.type(comment)
    }

    async clickSubmitForm() {
        await this.submitButton.click()
    }

    async clickResetForm() {
        await this.clearButton.click()
    }

    async assertFeedbackFormReset() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }

    async assertFeedbackFormSent(name?: string) {
        await expect(this.feedbackTitle).toBeVisible()
        await expect(this.feedbackBody).toBeVisible()
        if (name) {
            await expect(this.feedbackBody).toContainText(name)
        }
    }
}