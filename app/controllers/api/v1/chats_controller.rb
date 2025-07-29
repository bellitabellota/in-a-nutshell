class Api::V1::ChatsController < ApplicationController
  def show
    chat = Chat.find(params[:id])

    # Avoiding N+1 Queries with Action Text: https://guides.rubyonrails.org/v7.2/action_text_overview.html
    messages = chat.messages.with_rich_text_content_and_embeds.order(:created_at).map do |message|
      { id: message.id,
        author: message.author_id,
        creationDate: message.created_at,
        contentBody: message.content.body.to_s # converts the ActionText::Content to HTML
      }
    end

    render json: messages
  end
end
