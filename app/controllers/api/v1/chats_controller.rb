class Api::V1::ChatsController < ApplicationController
  include ActionView::Helpers::SanitizeHelper  # to get `sanitize` method

  # https://github.com/rails/actiontext/blob/1fdf6b6057a109eb843b40e7a0df2c046ab21782/app/helpers/action_text/content_helper.rb#L2-L7
  # TAG_NAME	=	"action-text-attachment" --> https://api.rubyonrails.org/v6.0.4.2/classes/ActionText/Attachment.html
  # ActionText::Attachment::ATTRIBUTES --> https://api.rubyonrails.org/v7.2.2.1/classes/ActionText/Attachment.html
  ALLOWED_TAGS = Rails::Html::Sanitizer.white_list_sanitizer.allowed_tags + [ "action-text-attachment", "figure", "figcaption" ]

  ALLOWED_ATTRIBUTES = Rails::Html::Sanitizer.white_list_sanitizer.allowed_attributes + %w[ sgid content-type url href filename filesize width height previewable presentation caption content ]

  def show
    chat = Chat.find(params[:id])

    # Avoiding N+1 Queries with Action Text: https://guides.rubyonrails.org/v7.2/action_text_overview.html
    messages = chat.messages.with_rich_text_content_and_embeds.order(:created_at).map do |message|
      { id: message.id,
        author: message.author_id,
        creationDate: message.created_at,
        contentBody: sanitize(message.content.body.to_s, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRIBUTES)
      }
    end

    render json: messages
  end
end
