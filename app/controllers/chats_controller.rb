class ChatsController < ApplicationController
  def index
    contact_ids = current_user.contacts.pluck(:id)
    contacts = User.includes(:profile).where(id: contact_ids)

    contact_profiles = contacts.map do |contact|
      {
        id: contact.id,
        profile: {
          name: contact.profile.name,
          info: contact.profile.info,
          connectToken: contact.profile.connect_token
        }
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
end
