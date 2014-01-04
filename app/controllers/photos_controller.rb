class PhotosController < ApplicationController
  before_filter :logged_in?

  respond_to :json
  
  def index
    @photos = Photo.order(:id).includes(:comments).reverse
    
    respond json: @photos
  end
  
  def create  
    tempfile = params[:photo][:image].tempfile
    params[:photo][:submitter_id] = params[:user_id]
    
    @photo = Photo.new(tempfile, params[:photo])
    
    if @photo.save
      respond_with @photo
    else
      flash[:errors] = @photo.errors.full_messages
      respond_with @photo
    end
  end

  def show
    @photo = Photo.find(params[:id])
    respond_with @photo
  end

  def update
    @photo = Photo.find(params[:id])
    @photo.update_attributes(params[:photo])
    render json: @photo
  end
  
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    respond_with @photo
  end

  def upvote
    @uservote = UserVote.find_by_user_id_and_photo_id(self.current_user.id, params[:id])
    if @uservote
      @uservote.update_attributes(value: 1)
    else
      UserVote.create(value: 1, user_id: self.current_user.id, photo_id: params[:id])
    end
    respond_with Photo.find(params[:id])
  end

  def downvote
    @uservote = UserVote.find_by_user_id_and_photo_id(self.current_user.id, params[:id])
    if @uservote
      @uservote.update_attributes(value: -1)
    else
      UserVote.create(value: -1, user_id: self.current_user.id, photo_id: params[:id])
    end
    respond_with Photo.find(params[:id])
  end
  
  def cancelvote
    @uservote = UserVote.find_by_user_id_and_photo_id(self.current_user.id, params[:id])
    if @uservote
      @uservote.update_attributes(value: 0)
    else
      UserVote.create(value: 0, user_id: self.current_user.id, photo_id: params[:id])
    end
    respond_with Photo.find(params[:id])
  end

end
