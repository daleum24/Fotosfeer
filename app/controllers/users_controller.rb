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

  def favorites
    @photos = Photo.where({user_id: self.current_user.id, is_favorite: true})
    fail
  end

  def uploaded_images
    fail
  end

end
