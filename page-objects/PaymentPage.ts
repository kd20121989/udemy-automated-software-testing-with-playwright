import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class PaymentPage extends AbstractPage{
    readonly savedPayeesOptions: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetailsInfo: Locator
    readonly accountsOptions: Locator
    readonly amountInput: Locator
    readonly datePickerInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly alertMessage: Locator

    constructor(page: Page) {
        super(page)
        this.savedPayeesOptions = page.locator("select#sp_payee")
        this.payeeDetailsButton = page.locator("a#sp_get_payee_details.badge")
        this.payeeDetailsInfo = page.locator("i#sp_payee_details")
        this.accountsOptions = page.locator("#sp_account")
        this.amountInput = page.locator("input#sp_amount")
        this.datePickerInput = page.locator("input#sp_date")
        this.descriptionInput = page.locator("input#sp_description")
        this.submitPaymentButton = page.locator("input#pay_saved_payees.btn-primary[type='submit']")
        this.alertMessage = page.locator("#alert_content > span")
    }

    async createPayment(
        payee: string = 'apple', 
        account: string = '5', 
        amount: string = '150', 
        date: string = '2023-09-03', 
        description: string = 'Payment for iCloud subscription') {

            await this.savedPayeesOptions.selectOption(payee)
            await this.payeeDetailsButton.click()
            await expect(this.payeeDetailsInfo).toBeVisible()
            if(payee === 'apple'){
            await expect(this.payeeDetailsInfo).toHaveText(/^For \d+ Apple account$/)
            }
            await this.accountsOptions.selectOption(account)
            await this.amountInput.type(amount)
            await this.datePickerInput.type(date)
            await this.descriptionInput.type(description)
            await this.submitPaymentButton.click()
    }

    async assertSuccessPaymentMessage() {
        await expect(this.alertMessage).toBeVisible()
        await expect(this.alertMessage).toHaveText(
            "The payment was successfully submitted.")
    }
}