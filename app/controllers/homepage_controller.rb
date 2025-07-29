class HomepageController < ApplicationController
  def index
    contact_ids = current_user.contacts.pluck(:id)
    contacts = User.includes(profile: [ picture_attachment: :blob ]).where(id: contact_ids)

    current_user_chats = current_user.chats.includes(:messages) # actually I only need last message date

    # index_by converts the array of current_user_chats into an hash with '[ chat.user_a_id, chat.user_b_id ]' being the key
    # https://api.rubyonrails.org/v7.0.0/classes/Enumerable.html#method-i-index_by
    indexed_chats = current_user_chats.index_by { |chat| [ chat.user_a_id, chat.user_b_id ].sort }

    contacts_with_profile_and_chat_info = contacts.map do |contact|
      user_ids = [ current_user.id, contact.id ].sort

      chat =  indexed_chats[user_ids]

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
