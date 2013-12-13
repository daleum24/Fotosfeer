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
  
  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    fail
    @photo = Photo.find(params[:id])
    @photo.update_attributes(params[:photo])
    redirect_to @photo
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
