class HomepageController < ApplicationController
  def index
    contact_ids = current_user.contacts.pluck(:id)
    contacts = User.includes(:profile).where(id: contact_ids)

    contacts_with_profile_and_chat_info = contacts.map do |contact|
      user_ids = [ current_user.id, contact.id ].sort

      chat = Chat.find_by(user_a_id: user_ids[0], user_b_id: user_ids[1])

      {
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
    end

    @react_props = {
      id: current_user.id,
      profile: {
        id: current_user.profile.id,
        name: current_user.profile.name,
        info: current_user.profile.info,
        connectToken: current_user.profile.connect_token,
        picture: current_user.profile.picture.attached? ? url_for(current_user.profile.picture) : nil
      },
      contacts: contacts_with_profile_and_chat_info
    }
  end
end
