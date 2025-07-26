require "rails_helper"

RSpec.describe "Request authentication to visit site", type: :system do
  context "when unauthenticated users visit homepage" do
    it "they are redirected to log in page" do
      visit root_path
      expect(page).to have_content "Log in"
    end
  end
end
