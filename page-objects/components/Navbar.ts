import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "../AbstractPage";

type TabNames = "Account Summary" | "Account Activity" | "Transfer Funds" | "Pay Bills" | "My Money Map" | "Online Statements";

export class Navbar extends AbstractPage{
    readonly accountSummary: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyMap: Locator
    readonly onlineStatements: Locator
    

    constructor(page: Page) {
        super(page)
        this.accountSummary = page.locator("li#account_summary_tab")
        this.accountActivity = page.locator("li#account_activity_tab")
        this.transferFunds = page.locator("li#transfer_funds_tab")
        this.payBills = page.locator("li#pay_bills_tab")
        this.myMoneyMap = page.locator("li#money_map_tab")
        this.onlineStatements = page.locator("li#online_statements_tab")
    }
    

    async clickOnTab(tabName: TabNames) {
        switch(tabName) {
            case "Account Summary":
                await this.accountSummary.click()
                break
            case "Account Activity":
                await this.accountActivity.click()
                break
            case "Transfer Funds":
                await this.transferFunds.click()
                break
            case "Pay Bills":
                await this.payBills.click()
                await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/pay-bills.html")
                await expect(this.page.locator("h2.board-header")).toBeVisible()
                await expect(this.page.locator("h2.board-header")).toHaveText("Make payments to your saved payees")
                break
            case "My Money Map":
                await this.myMoneyMap.click()
                break
            case "Online Statements":
                await this.onlineStatements.click()
                break
            default:
                throw new Error("This tab does not exist")
                
        }
    }
}