class ChatsController < ApplicationController
  def index
    contact_ids = current_user.contacts.pluck(:id)
    contacts = User.includes(:profile).where(id: contact_ids)

    contact_profiles = contacts.map do |contact|
      user_ids = [current_user.id, contact.id].sort

      chat = Chat.find_by(user_a_id: user_ids[0], user_b_id: user_ids[1])
      
      {
        id: contact.id,
        profile: {
          name: contact.profile.name,
          info: contact.profile.info,
          connectToken: contact.profile.connect_token
        },
        chatId: chat.id
      }
    end

    @react_props = {
      profile: {
        name: current_user.profile.name,
        info: current_user.profile.info,
        connectToken: current_user.profile.connect_token
      },
      contacts: contact_profiles
    }
  end

  def show
    chat = Chat.find(params[:id])

    messages = chat.messages.map do |message|
      { id: message.id,
        author: message.author_id,
        creationDate: message.created_at,
        contentBody: message.content.body
      }
    end

    render json: messages
  end
end
