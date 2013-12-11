require 'bcrypt'

class User < ActiveRecord::Base
  attr_accessible :username, :email, :password
  attr_reader :password

  validates :username, :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :session_token, :password_digest, presence: true

  before_validation :reset_session_token!, on: :create

  def self.find_by_credentials(email, password)
    return nil if (email.nil? || password.nil?)
    user = User.find_by_email(email)
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

end
