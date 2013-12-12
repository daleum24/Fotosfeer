#http://stackoverflow.com/questions/5968559/retrieve-latitude-and-longitude-of-a-draggable-pin-via-google-maps-api-v3
# map box
# static images api
# xif date

class Photo < ActiveRecord::Base
  attr_accessible :submitter_id, :title, :description, :latitude, :longitude, :image

  validates :submitter_id, :title, :latitude, :longitude, presence: true

  belongs_to(
    :submitter,
    class_name: "User",
    foreign_key: :submitter_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :photo_id,
    primary_key: :id
  )

  has_attached_file :image

  def comments_by_parent_id
    comments_by_parent = Hash.new { |hash, key| hash[key] = [] }

    comments.each do |comment|
      comments_by_parent[comment.parent_comment_id] << comment
    end

    comments_by_parent
  end

end
