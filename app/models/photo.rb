#http://stackoverflow.com/questions/5968559/retrieve-latitude-and-longitude-of-a-draggable-pin-via-google-maps-api-v3
# map box
# static images api
# xif date

require 'addressable/uri'

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

  has_many(
    :uservotes,
    class_name: "UserVote",
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

  def static_page
    url = Addressable::URI.new(
        :scheme => "https",
        :host => "maps.googleapis.com",
        :path => "/maps/api/staticmap",
        :query_values => {
          # :key => ENV['GOOGLE_API_KEY'],
          :center => "#{self.latitude},#{self.longitude}",
          :zoom => 15,
          :markers => "markerStyles|#{self.latitude},#{self.longitude}|",
          :size => "500x400",
          :sensor => "false"
        }).to_s
  end

end






























