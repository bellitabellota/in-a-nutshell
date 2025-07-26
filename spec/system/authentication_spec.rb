require "rails_helper"

RSpec.describe "Request authentication to visit site", type: :system do
  context "when unauthenticated users visit homepage" do
    it "they are redirected to log in page" do
      visit root_path
      expect(page).to have_content "Log in"
    end
  end

  context "when users authenticate and visit homepage" do
    it "they are directed to the root page" do
      user = FactoryBot.create(:user)

      login_as user
      visit root_path

      expect(page).to have_content "My Profile"
    end
  end
end
