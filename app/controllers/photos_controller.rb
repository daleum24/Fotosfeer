class PhotosController < ApplicationController
  before_filter :logged_in?

  #User Home Page
  def index
    @photos = Photo.order("created_at DESC")
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(params[:photo])
    @photo.update_attributes(submitter_id: params[:user_id])

    if @photo.save
      redirect_to @photo
    else
      flash[:errors] = @photo.errors.full_messages
      redirect_to photo
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end

end
