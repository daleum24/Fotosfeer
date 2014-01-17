class PasswordResetsController < ApplicationController

  def new
    @photo = Photo.last
  end

  def create
    @user = User.find_by_email(params[:user][:email])

    if !!@user
      @user.send_password_reset
      flash[:errors] = ["Password reset email sent!"]
      redirect_to new_session_url
    else
      flash[:errors] = ["No user found with that email"]
      redirect_to new_password_reset_url
    end
  end

  def edit

  end

  def update
    @user = User.find_by_password_reset_token(params[:password_reset_token])

    if @user.update_attributes(password: params[:user][:password])
      login(@user)
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to edit_password_reset_url(:password_reset_token => @user.password_reset_token)
    end
  end

end
