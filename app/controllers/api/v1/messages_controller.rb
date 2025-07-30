class Api::V1::MessagesController < ApplicationController
  include ActionView::Helpers::SanitizeHelper  # to get `sanitize` method

  # https://github.com/rails/actiontext/blob/1fdf6b6057a109eb843b40e7a0df2c046ab21782/app/helpers/action_text/content_helper.rb#L2-L7
  # TAG_NAME	=	"action-text-attachment" --> https://api.rubyonrails.org/v6.0.4.2/classes/ActionText/Attachment.html
  # ActionText::Attachment::ATTRIBUTES --> https://api.rubyonrails.org/v7.2.2.1/classes/ActionText/Attachment.html
  ALLOWED_TAGS = Rails::Html::Sanitizer.white_list_sanitizer.allowed_tags + [ "action-text-attachment", "figure", "figcaption" ]

  ALLOWED_ATTRIBUTES = Rails::Html::Sanitizer.white_list_sanitizer.allowed_attributes + %w[ sgid content-type url href filename filesize width height previewable presentation caption content ]

  def create
    chat = Chat.find(params[:chat_id])
    message = chat.messages.build(content: params[:content], author_id: current_user.id)

    message.save

    sanitized_html = sanitize(message.content.body.to_s, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRIBUTES)

    ChatChannel.broadcast_to(chat, { id: message.id,
      author: message.author_id,
      creationDate: message.created_at,
      contentBody: sanitized_html
    })
  end
end
