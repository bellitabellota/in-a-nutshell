require "rails_helper"

RSpec.describe "Request authentication to visit site", type: :system do
  context "when unauthenticated users" do
    context "try to visit homepage" do
      it "they are redirected to log in page" do
        visit root_path
        expect(page).to have_content "Log in"
      end
    end

    context "try to visit an API endpoint e.g. profile search" do
      it "they are redirected to log in page" do
        unauthenticated_user =  FactoryBot.create(:user)
        connect_token = unauthenticated_user.profile.connect_token

        visit "/api/v1/profiles/search?token=#{connect_token}"
        expect(page).to have_content "Log in"
      end
    end

    context "try to access an endpoint of the client side router e.g. '/contacts'" do
      it "they are redirected to log in page" do
        visit "/contacts"

        expect(page).to have_content "Log in"
      end
    end
  end

  context "when authenticated users" do
    let(:authenticated_user) { FactoryBot.create(:user) }

    before do
      login_as authenticated_user
    end

    context "visit homepage" do
      it "they are directed to the root page" do
        visit root_path

        expect(page).to have_content "My Profile"
      end
    end

    context "try to visit an API endpoint e.g. profile search" do
      it "they are granted access receiving a json response" do
        connect_token = authenticated_user.profile.connect_token

        visit "/api/v1/profiles/search?token=#{connect_token}"

        raw_json = find("pre").text
        json = JSON.parse(raw_json)

        expect(json).to include(
          "id" => authenticated_user.profile.id,
          "name" => authenticated_user.email,
          "connectToken" => connect_token
        )
      end
    end

    context "try to access an endpoint of the client side router e.g. '/contacts'" do
      it "they are granted access" do
        visit "/contacts"

        expect(page).to have_content "Search"
      end
    end

    context "click the logout button" do
      it "logs them out and redirects to login page" do
        visit root_path
        find("img.logout-icon").click # thanks to event bubbling this button can easily be clicked

        expect(page).to have_content("Log in")
      end
    end
  end
end
