class Api::V1::ChatsController < ApplicationController
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
