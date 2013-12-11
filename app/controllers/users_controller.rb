class UsersController < ApplicationController

  def new

  end

  def create
    @user = User.new(params[:user])

    if @user.save
      AuthMailer.signup_email(@user).deliver!
      login(@user)
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end

end
