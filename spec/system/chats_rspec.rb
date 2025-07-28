require "rails_helper"

RSpec.describe "Chats", type: :system do
  let(:current_user) { FactoryBot.create(:user) }

  context "if user has no contacts/chats" do
    it "displays 'You have no contacts yet.'" do
      login_as current_user
      visit root_path
      expect(page).to have_content("You have no contacts yet.")
    end
  end

  context "if user has contacts/chats" do
    it "lists all chats" do
      user_a = FactoryBot.create(:user, email: "testusera@mail.com")
      user_b = FactoryBot.create(:user, email: "testuserb@mail.com")

      # Remember the UserContact model takes care of creating the inverse entry to ensure mutual connection
      UserContact.create(user_id: current_user.id, contact_id: user_a.id)
      UserContact.create(user_id: current_user.id, contact_id: user_b.id)

      # Remember the Chat model will automatically sort the ids before validation when creating the chat entry
      Chat.create(user_a_id: current_user.id, user_b_id: user_a.id)
      Chat.create(user_a_id: current_user.id, user_b_id: user_b.id)

      login_as current_user
      visit root_path

      expect(page).to have_content("testusera@mail.com")
      expect(page).to have_content("testusera@mail.com")
    end
  end

  context "clicking on a chat" do
    it "opens the corresponding chat" do
      user_a = FactoryBot.create(:user, email: "testusera@mail.com")

      # Remember the UserContact model takes care of creating the inverse entry to ensure mutual connection
      UserContact.create(user_id: current_user.id, contact_id: user_a.id)

      # Remember the Chat model will automatically sort the ids before validation when creating the chat entry
      Chat.create(user_a_id: current_user.id, user_b_id: user_a.id)

      login_as current_user
      visit root_path

      find('p', text: "testusera@mail.com").click
      expect(page).to have_selector("trix-editor")
    end
  end
end
