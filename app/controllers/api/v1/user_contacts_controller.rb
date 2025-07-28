class Api::V1::UserContactsController < ApplicationController
  def connect
    contact_id = params.require(:user_contact).permit(:contactId)[:contactId]

    user_contact = UserContact.new(user_id: current_user.id, contact_id: contact_id)

    if user_contact.save
      contact = User.includes(:profile).where(id: contact_id).first

      # Remember the Chat model will automatically sort the ids before validation when creating the chat entry
      chat = Chat.find_by(user_a_id: current_user.id, user_b_id: contact.id) ||
             Chat.find_by(user_a_id: contact.id, user_b_id: current_user.id) ||
             Chat.create(user_a_id: current_user.id, user_b_id: contact.id)

      contact_with_profile_and_chat_info = {
        id: contact.id,
        profile: {
          name: contact.profile.name,
          info: contact.profile.info,
          connectToken: contact.profile.connect_token,
          picture: contact.profile.picture.attached? ? url_for(contact.profile.picture) : nil
        },
        chatId: chat.id,
        chatCreationDate: chat.created_at,
        lastActivity: chat.messages.maximum(:created_at)
      }

      render json: { message: "Contact successfully added.",
                    contact: contact_with_profile_and_chat_info }
    else
      render json: { error: "An error occurred. The contact could not be added." }
    end
  end
end
