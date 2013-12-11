require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :email, :password
  attr_reader :password

  validates :username, :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :password_digest, presence: true

  before_validation :reset_session_token!, on: :create

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def send_password_reset
    self.password_reset_token = SecureRandom.urlsafe_base64(16)
    self.save!
    AuthMailer.password_reset_email(self).deliver!
  end

end
