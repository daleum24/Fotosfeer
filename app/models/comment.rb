class Comment < ActiveRecord::Base
  attr_accessible :commenter_id, :parent_comment_id, :photo_id, :body

  validates :commenter_id, :body, :photo_id, presence: true

  belongs_to(
    :commenter,
    class_name: "User",
    foreign_key: :commenter_id,
    primary_key: :id
  )

  belongs_to(
    :photo,
    class_name: "Photo",
    foreign_key: :photo_id,
    primary_key: :id
  )

  belongs_to(
    :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )



end
