class SessionsController < ApplicationController
  before_filter :logged_in?, only: [:destroy]
  before_filter :current_user_redirect, only: [:new]

  def new
    @photo = Photo.last ? Photo.last : Photo.new
  end

  def create
    auth = request.env['omniauth.auth']
    
    unless auth.nil?
      @authorization = Authorization.find_by_provider_and_uid(auth[:provider], auth[:uid])    
      unless @authorization
        user = User.find_by_email(auth[:info][:email]) 
      
        @user = user ? user : User.create!(
          username: auth[:info][:name],
          email: auth[:info][:email],
          password: SecureRandom.urlsafe_base64(16)
        )
      
        @authorization = Authorization.create!(
          uid: auth[:uid],
          provider: auth[:provider],
          user_id: @user.id
        )
      else
        @user = User.find(@authorization.user_id)
      end
      
      login(@user)
      
    else
      
      user = User.find_by_credentials(params[:user][:email], params[:user][:password])
      if user
        login(user)
      else
        flash[:errors] = ["Invalid email/password combination"]
        redirect_to new_session_url
      end
    end
  end

  def destroy
    logout
  end
  
  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
