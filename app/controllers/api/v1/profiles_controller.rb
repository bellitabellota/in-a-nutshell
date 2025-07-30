class Api::V1::ProfilesController < ApplicationController
  include ActionView::Helpers::SanitizeHelper

  def search
    profile = Profile.find_by(connect_token: params[:token])

    if profile
      render json: {
        id: profile.id,
        name: profile.name,
        info: profile.info,
        connectToken: profile.connect_token,
        picture: profile.picture.attached? ? url_for(profile.picture) : nil
      }
    else
      render json: { error: "User not found." }, status: :not_found
    end
  end

  def update
    profile = Profile.find(params[:id])

    if current_user.id != profile.user_id
      render json: { error: "Not allowed" }, status: :forbidden
      return
    end

    tags = %w[a acronym b strong i em li ul ol h1 h2 h3 h4 h5 h6 blockquote br cite sub sup ins p]

    cleaned_params = profile_params
    cleaned_params[:name] = sanitize(cleaned_params[:name], tags: [], attributes: [])
    cleaned_params[:info] = cleaned_params[:info].blank? ? nil : sanitize(cleaned_params[:info], tags: tags, attributes: %w[href title])

    if profile.update(cleaned_params)
      render json: {
        id: profile.id,
        name: profile.name,
        info: profile.info,
        connectToken: profile.connect_token,
        picture: current_user.profile.picture.attached? ? url_for(current_user.profile.picture) : nil
      }
    else
      render json: { error: profile.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :info, :picture)
  end
end
