import { test, expect } from "@playwright/test"
import { loadHomepage, assertTitle } from "../helpers"

test("Simple basic test", async ({ page }) => {
    await page.goto("https://example.com/")
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toHaveText('Example Domain')
})

test("Clicking on Elements", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.getByText("Sign in").click()

    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
})

test.skip("Selectors", async ({ page }) => {
    // text
    await page.click('test=some text')
    // css selectors
    await page.click('button')
    await page.click("#id")
    await page.click('.class')

    // Only visible Css Selector
    await page.click('.submit-button:visible')

    // Combination
    await page.click('#username .first')

    // XPath
    await page.click('//button')
})

test.describe("My first test suite", () => {
    test('Working with Inputs @myTag', async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click('#signin_button')
    
        await page.type('#user_login', 'some username')
        await page.type('#user_password', '#some password')
        await page.getByText("Sign in").click()
    
        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })
    
    test('Assertions @myTag', async ({ page }) => {
        await page.goto('https://example.com/')
        await expect(page).toHaveURL('https://example.com/')
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        await expect(element).toBeVisible()
        await expect(element).toHaveText('Example Domain')
        await expect(element).toHaveCount(1)
    
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })

    test.describe.parallel('Hooks', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('https://example.com/')
        })
        test('Screenshots', async ({ page }) => {
            await page.screenshot({ path: "screenshot.png", fullPage: true })
        })
    
        test("Single element Screenshot", async ({ page }) => {
            const element = await page.$('h1')
            await element?.screenshot({ path: "single_element_screenshot.png"})
        })
    })
})

test("Custom Helpers",async ({page}) => {
    await loadHomepage(page)
    await assertTitle(page)
})