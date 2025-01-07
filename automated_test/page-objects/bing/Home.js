export default class Home {
  constructor(page) {
    this.page = page;
    this.searchField = page.locator("#sb_form_q");
    this.videosTab = page.getByRole("link", { name: "Videos", exact: true });
  }

  async fillSearchField(text) {
    await this.searchField.click();
    await this.searchField.fill(text);
  }

  async clickVideoTab(context) {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // Wait for the new page to open
      this.videosTab.click(), // Click on the "Videos" tab
    ]);
    return newPage;
  }
}
