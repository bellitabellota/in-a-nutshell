class Api::V1::UsersController < ApplicationController
  def destroy
    user = User.find(current_user.id)
    sign_out(user)
    flash[:notice] = "You successfully deleted your account."
    user.destroy

    render json: { message: "Account deleted" }, status: :ok
  end
end
