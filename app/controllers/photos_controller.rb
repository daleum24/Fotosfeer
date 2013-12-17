class PhotosController < ApplicationController
  before_filter :logged_in?

  respond_to :json
  
  def index
    @photos = Photo.order("created_at DESC")
    respond json: @photos
  end

  def geolocate
    tempfile = params[:photo][:image].tempfile
    
    @photo = Photo.new(tempfile, {submitter_id: params[:user_id]})
    
    respond_with @photo
  end
  
  def create  
    if @photo.save
      respond_with @photo
    else
      flash[:photo_errors] = @photo.errors.full_messages
      respond_with @photo
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end
  

  def update
    @photo = Photo.find(params[:id])
    @photo.update_attributes(params[:photo])
    redirect_to @photo
  end
  
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    redirect_to uploaded_images_user_url(self.current_user.id)
  end

  def upvote
    @uservote = UserVote.find_by_user_id_and_photo_id(self.current_user.id, params[:id])
    if @uservote
      @uservote.update_attributes(value: 2)
    else
      UserVote.create(value: 2, user_id: self.current_user.id, photo_id: params[:id])
    end
    redirect_to Photo.find(params[:id])
  end

  def downvote
    @uservote = UserVote.find_by_user_id_and_photo_id(self.current_user.id, params[:id])
    if @uservote
      @uservote.update_attributes(value: -1)
    else
      UserVote.create(value: -1, user_id: self.current_user.id, photo_id: params[:id])
    end
    redirect_to Photo.find(params[:id])
  end

end
