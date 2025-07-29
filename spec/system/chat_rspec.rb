require "rails_helper"

RSpec.describe "Chat", type: :system do
  it "loads and displays messages that were sent in the chat" do
    current_user = FactoryBot.create(:user)
    contact = FactoryBot.create(:user, email: "testusera@mail.com")

    # Remember the UserContact model takes care of creating the inverse entry to ensure mutual connection
    UserContact.create(user_id: current_user.id, contact_id: contact.id)

    # Remember the Chat model will automatically sort the ids before validation when creating the chat entry
    chat = Chat.create(user_a_id: current_user.id, user_b_id: contact.id)

    chat.messages.create(content: "Second message", author_id: contact.id, created_at: Time.current)
    chat.messages.create(content: "First message", author_id: current_user.id, created_at: 1.minute.ago)

    login_as current_user
    visit "/chats/#{chat.id}"

    # testing the order of elements: https://gorails.com/forum/how-do-i-test-the-order-of-elements-on-a-rails-app-page-with-rspec-capybara
    message_texts = all(".trix-content").map { |el| el.text }

    expect(message_texts).to eq([ "First message", "Second message" ])
  end

  context "when users send a message" do
    it "it gets persisted in the database" do
      current_user = FactoryBot.create(:user)
      contact = FactoryBot.create(:user, email: "testusera@mail.com")

      # Remember the UserContact model takes care of creating the inverse entry to ensure mutual connection
      UserContact.create(user_id: current_user.id, contact_id: contact.id)

      # Remember the Chat model will automatically sort the ids before validation when creating the chat entry
      chat = Chat.create(user_a_id: current_user.id, user_b_id: contact.id)

      login_as current_user
      visit "/chats/#{chat.id}"

      message = "Test Message 1"

      page.execute_script(<<~JS)
      const editor = document.querySelector("trix-editor").editor;
      editor.element.innerHTML = "<div>Test Message 1</div>";
      // trix-change fires whenever the editor’s contents have changed.
      // https://github.com/basecamp/trix/blob/main/README.md
      const event = new Event("trix-change");
      editor.element.dispatchEvent(event);
      JS

      find("button[type='submit']").click
      sleep(1)

      expect(Message.last.content.to_s).to include(message)
    end
  end
end
