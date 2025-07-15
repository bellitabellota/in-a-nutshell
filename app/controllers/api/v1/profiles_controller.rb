class Api::V1::ProfilesController < ApplicationController
  def search
    profile = Profile.find_by(connect_token: params[:token])

    if profile
      render json: { name: profile.name, connectToken: profile.connect_token, info: profile.info, userID: profile.user_id  }
    else
      render json: { error: "User not found." }, status: :not_found
    end
  end

  def update
    profile = Profile.find(params[:id])

    if profile.update(profile_params)
      render json: profile.as_json.merge({ pictureURL: url_for(profile.picture) })
    else
      # if time permits improve error handling
      render json: { error: "Profile could not be updated." }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:profile).permit(:name, :info, :picture)
  end
end
