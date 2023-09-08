import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { FeedbackPage } from "../../page-objects/FeedbackPage"


test.describe.parallel("Feedback Form", () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    let name: string = "Dmitrii"
    let email: string = "kd20121989@gmail.com"
    let subject: string = "Very important"
    let comment: string = "I have some important questions."

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackLink()
    })

    test("Submit feedback form",async ({ page }) => {
        await feedbackPage.fillForm(
            name, 
            email, 
            subject, 
            comment)
        await feedbackPage.clickSubmitForm()
        await feedbackPage.assertFeedbackFormSent(name)
    })

    test("Reset feedback form", async ({ page }) => {
        await feedbackPage.fillForm(
            name, 
            email, 
            subject, 
            comment)
        await feedbackPage.clickResetForm()
        await feedbackPage.assertFeedbackFormReset()
    })
})