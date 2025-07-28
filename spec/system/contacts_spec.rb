require "rails_helper"

RSpec.describe "Contacts", type: :system do
  let(:current_user) { FactoryBot.create(:user) }
  let(:user_a) { FactoryBot.create(:user, email: "testusera@mail.com") }

  before do
    login_as current_user
    visit "/contacts"
  end

  context "visiting the 'Contacts' page" do
    it "displays a search bar" do
      expect(page).to have_content("Search")
    end
  end

  context "searching for a valid Connect Token" do
    it "displays corresponding user's profile" do
      fill_in "Enter A Connect Token", with: "#{user_a.profile.connect_token}"
      click_button "Search"
      expect(page).to have_css("img[src*='default-profile-picture']")
      expect(page).to have_content("Name: testusera@mail.com")
      expect(page).to have_content("Connect Token: #{user_a.profile.connect_token}")
      expect(page).to have_content("Info: --")
    end

    context "... and clicking the 'Connect' button" do
      before do
        fill_in "Enter A Connect Token", with: "#{user_a.profile.connect_token}"
        click_button "Search"
        click_button "Connect"
      end

      it "displays 'Connected'" do
        expect(page).to have_content("Connected")
      end

      it "adds a Chat for that contact under the Chats page" do
        visit root_path
        expect(page).to have_content("testusera@mail.com")
      end
    end
  end

  context "searching for an invalid Connect Token" do
    it "alerts 'Error: User not found.'" do
      fill_in "Enter A Connect Token", with: "inexistent-token-87-987"
      # although there is no traditional expect clause the test will throw an error if the alert does not appear
      accept_alert("Error: User not found.") do
        click_button "Search"
      end
    end
  end

  context "searching for multiple empty spaces" do
    it "alerts 'Input field cannot be empty.'" do
      fill_in "Enter A Connect Token", with: "   "
      # although there is no traditional expect clause the test will throw an error if the alert does not appear
      accept_alert("Input field cannot be empty.") do
        click_button "Search"
      end
    end
  end

  context "searching for an empty string" do
    it "alerts 'Input field cannot be empty.'" do
      fill_in "Enter A Connect Token", with: ""
      # although there is no traditional expect clause the test will throw an error if the alert does not appear
      accept_alert("Input field cannot be empty.") do
        click_button "Search"
      end
    end
  end
end
