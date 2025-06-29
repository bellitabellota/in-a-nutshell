class Api::V1::MessagesController < ApplicationController
  def create
    chat = Chat.find(params[:chat_id])
    message = chat.messages.build(content: params[:content], author_id: current_user.id)

    message.save

    ChatChannel.broadcast_to(chat, message)
  end
end