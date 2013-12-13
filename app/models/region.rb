class Region < ActiveRecord::Base
  attr_accessible :name, :user_id, :latitude, :longitude
  
  validates :name, :user_id, :latitude, :longitude, presence: true
  
  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  def find_in_region_photos
    lat_range = ((self.latitude - 0.003)..(self.latitude + 0.003))
    long_range = ((self.longitude - 0.003)..(self.longitude + 0.003))
    photos_in_range = Photo.where(latitude: lat_range).where(longitude: long_range)
  end
  
  def markers_string
    markers_str = ""
    markers = ("A".."Z").to_a
    photos = self.find_in_region_photos
    
    photos.each_with_index do |photo, index| 
      markers_str = markers_str + "|label, {markers[index]}|#{photo.latitude}, #{photo.longitude}|,"
    end
    markers_str[0,(markers_str.length-1)]
  end
  
  def static_page
    url = Addressable::URI.new(
        :scheme => "https",
        :host => "maps.googleapis.com",
        :path => "/maps/api/staticmap",
        :query_values => {
          :center => "#{self.latitude},#{self.longitude}",
          :zoom => 18,
          :markers => "#{self.markers_string}",
          :size => "500x400",
          :sensor => "false"
        }).to_s
  end
  
end
