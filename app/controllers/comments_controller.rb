class CommentsController < ApplicationController
  respond_to :json
  
  def index
    @photo = Photo.find(params[:photo_id])
    @comments = @photo.comments
    
    respond_with @comments
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.update_attributes(commenter_id: self.current_user.id, photo_id: params[:photo_id])

    if @comment.save
      redirect_to Photo.find(@comment.photo_id)
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to Photo.find(@comment.photo_id)
    end

  end

end
