class Authorization < ActiveRecord::Base
  attr_accessible :provider, :uid, :user_id
  
  validates :provider, :uid, :user_id, presence: true
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
end
