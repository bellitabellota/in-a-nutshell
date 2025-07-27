require 'rails_helper'

RSpec.describe "Profiles API", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:another_user) { FactoryBot.create(:user, email: "testuser2@mail.com") }

  before do
    login_as user
  end

  describe "PATCH /api/v1/profiles/:id" do
    context "when user tries to update another user's profile" do
      it "returns 403 Forbidden" do
        patch api_v1_profile_path(another_user.profile.id), params: {
          profile: {
            name: "Any Name"
          }
        }

        expect(response).to have_http_status(:forbidden)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Not allowed")
      end
    end
  end
end
