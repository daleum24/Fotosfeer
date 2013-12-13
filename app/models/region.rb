class Region < ActiveRecord::Base
  attr_accessible :name, :user_id, :latitude, :longitude
  
  validates :name, :user_id, :latitude, :longitude, presence: true
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
end
