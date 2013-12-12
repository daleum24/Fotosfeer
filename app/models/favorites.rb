class Favorites < ActiveRecord::Base
  attr_accessible :user_id, :photo_id

  validates :user_id, :photo_id, presence: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :photo,
    class_name: "Photo",
    foreign_key: :photo_id,
    primary_key: :id
  )

end
