module SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.session_token
    redirect_to photos_url
  end

  def logout
    self.current_user.reset_session_token!
    self.current_user.save
    @current_user = nil
    session[:session_token] = nil
    redirect_to root_url
  end

  def logged_in?
    unless self.current_user
      flash[:errors] = ["You must be signed in to see this page!"]
      redirect_to root_url
    end
  end

end
