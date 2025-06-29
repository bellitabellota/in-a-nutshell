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

  def create
    chat = Chat.find(params[:id])
    message = chat.messages.build(message_params.merge(author_id: current_user.id))
    message.save

    ChatChannel.broadcast_to(chat, message)
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
