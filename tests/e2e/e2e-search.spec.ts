import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"

test.describe.parallel("Search results", () => {
    test("Should find search results",async ({ page }) => {
        let homePage: HomePage = new HomePage(page)

        const searchWord = "bank"
        const linkResultsList = page.locator("li > a")

        await homePage.visit()
        await homePage.searchFor(searchWord)

        await expect(page).toHaveURL("http://zero.webappsecurity.com/search.html?searchTerm="+searchWord)
        await expect(linkResultsList).toHaveCount(2)
    })
})