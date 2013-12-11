class AuthMailer < ActionMailer::Base
  default :from => 'admin@imgur_clone.com'

  # send a signup email to the user, pass in the user object that
  # contains the user's email address
  def signup_email(user)
    mail(
      :to => user.email,
      :subject => 'Thanks for signing up'
    )
  end

  def password_reset_email(user)
    @user = user
    @url = edit_password_reset_url
    mail(
      :to => user.email,
      :subject => 'Password Reset'
    )
  end
end