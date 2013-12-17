#http://stackoverflow.com/questions/5968559/retrieve-latitude-and-longitude-of-a-draggable-pin-via-google-maps-api-v3
# map box
# static images api
# xif date

require 'addressable/uri'
require 'nokogiri'

class Photo < ActiveRecord::Base
  attr_accessible :submitter_id, :title, :description, :latitude, :longitude, :image 

  validates :submitter_id, :title, :latitude, :longitude, presence: true
  validates :image, attachment_presence: true
  
  before_validation :check_title, on: :create

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

  has_many(
    :favorites,
    class_name: "Favorite",
    foreign_key: :photo_id,
    primary_key: :id
  )

  has_many(
    :favoring_users, through: :favorites, source: :user
  )

  has_attached_file :image
  
  def initialize(tempfile, attribute={})
    super(attribute)
    check_for_geotag(tempfile)
  end

  def check_for_geotag(tempfile)
    imgfile = EXIFR::JPEG.new(tempfile)
    return if imgfile.nil?
    self.latitude = imgfile.gps.latitude
    self.longitude = imgfile.gps.longitude
  end
  
  def check_title
    self.title = "Untitled" if self.title.nil?
  end

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
          :center => "#{self.latitude},#{self.longitude}",
          :zoom => 17,
          :markers => "markerStyles|#{self.latitude},#{self.longitude}|",
          :size => "500x400",
          :sensor => "false"
        }).to_s
  end
  
  def get_directions(lat_origin, long_origin)
    url = Addressable::URI.new(
        :scheme => "https",
        :host => "maps.googleapis.com",
        :path => "/maps/api/directions/json",
        :query_values => {
          :origin => "#{lat_origin},#{long_origin}",
          :destination => "#{self.latitude},#{self.longitude}",
          :sensor => "false",
          :mode => "walking"
        }).to_s
    url
    response = JSON.parse(RestClient.get(url))
    if response["routes"] != []
      instructions = response["routes"][0]["legs"][0]["steps"].map do |step|
        html = step["html_instructions"].gsub("Destination", ". Destination")
        Nokogiri::HTML(html).text + "."
      end
      return instructions
    else
      return nil
    end
  end
  
  def as_json(options)
    super(options).merge!({image_url: self.image.url})
  end

end






























