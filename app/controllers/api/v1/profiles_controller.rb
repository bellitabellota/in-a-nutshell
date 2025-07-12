class Api::V1::ProfilesController < ApplicationController
  def search
    profile = Profile.find_by(connect_token: params[:token])

    if profile
      render json: { name: profile.name, connectToken: profile.connect_token, info: profile.info, userID: profile.user_id  }
    else
      render json: { error: "User not found." }, status: :not_found
    end
  end
end
