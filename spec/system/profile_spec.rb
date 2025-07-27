require "rails_helper"

RSpec.describe "Profile", type: :system do
  let(:user) { FactoryBot.create(:user) }

  before do
    login_as user

    visit "/profile/#{user.profile.connect_token}"
  end

  context "when users visit profile page for the first time" do
    it "they see the default profile" do
      expect(page).to have_css("img[src*='default-profile-picture']")
      expect(page).to have_content("Name: testuser1@mail.com")
      expect(page).to have_content("Connect Token: #{user.profile.connect_token}")
      expect(page).to have_content("Info: --")
    end
  end

  context "when users delete their profile" do
    it "their profile is deleted/they cannot log in anymore" do
      destroy_user = FactoryBot.create(:user, email: "testuser2@mail.com", password: "testuser2")
      login_as destroy_user
      visit "/profile/#{destroy_user.profile.connect_token}"
      expect(page).to have_selector("button", text: "Delete Account")

      accept_confirm "Are you sure you want to delete your account? This action cannot be undone." do
        click_button "Delete Account"
      end

      expect(page).to have_content("You successfully deleted your account.")

      fill_in "Email", with: "#{destroy_user.email}"
      fill_in "Password", with: "#{destroy_user.password}"
      click_button "Log in"

      expect(page).to have_content("Invalid Email or password.")
    end
  end

  context "when users edit their profile" do
    it "displays updated profile" do
      click_button "Edit"
      attach_file("image_uploads", Rails.root.join("spec/assets/test_image.png"), make_visible: true)
      fill_in "Name", with: "Test User 1"
      fill_in "Info", with: "I love testing."
      click_button "Update"

      expect(page).to have_css("img[src*='test_image.png']")
      expect(page).to have_content("Name: Test User 1")
      expect(page).to have_content("Info: I love testing.")
    end
  end

  context "when users try to edit their name to an empty string" do
    it "alerts 'A name must be entered.'" do
      click_button "Edit"
      fill_in "Name", with: ""

      # although there is no traditional expect clause the test will throw an error if the alert does not appear
      accept_alert("A name must be entered.") do
        click_button "Update"
      end
    end
  end

  context "when users try to edit their name to an multiple empty spaces" do
    it "alerts 'A name must be entered.'" do
      click_button "Edit"
      fill_in "Name", with: ""

      # although there is no traditional expect clause the test will throw an error if the alert does not appear
      accept_alert("A name must be entered.") do
        click_button "Update"
      end
    end
  end
end
