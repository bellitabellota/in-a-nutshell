class Api::V1::ProfilesController < ApplicationController
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

    cleaned_params = profile_params.to_h
    cleaned_params["info"] = nil if cleaned_params["info"].blank?

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
