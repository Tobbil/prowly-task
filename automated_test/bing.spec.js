import { test, expect } from "@playwright/test";
import Home from "./page-objects/bing/Home";

test.describe("Tests for Bing", () => {
  const url = "https://www.bing.com";
  const testString = "semrush";

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test("TC-1: Switching filters without re-entering the search term", async ({
    page,
    context,
  }) => {
    const homePage = new Home(page);
    await homePage.fillSearchField(testString);
    await expect(homePage.searchField).toHaveText(testString);
    await page.keyboard.press("Enter");
    await page.waitForLoadState("networkidle");

    await expect(homePage.searchField).toHaveValue(testString);
    const newPage = await homePage.clickVideoTab(context);
    await newPage.waitForLoadState("networkidle");
    
    await expect(homePage.searchField).toHaveValue(testString);
    const currentURL = newPage.url();
    expect(currentURL).toContain("&FORM=HDRSC4");
  });
});
