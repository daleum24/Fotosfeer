class SessionsController < ApplicationController
  before_filter :logged_in?, only: [:destroy]

  def new

  end

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if user
      login(user)
    else
      flash[:errors] = ["Invalid email/password combination"]
      redirect_to new_session_url
    end

  end

  def destroy
    logout
  end
end
