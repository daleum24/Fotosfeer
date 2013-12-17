class CommentsController < ApplicationController
  respond_to :json
  
  def index
    @photo = Photo.find(params[:photo_id])
    @comments = @photo.comments
    
    respond_with @comments
  end

  def create
    @comment = Comment.new(params[:comment])
    @comment.commenter_id = self.current_user.id
    # @comment.update_attributes(commenter_id: self.current_user.id)

    if @comment.save
      respond_with @comment
    else
      flash[:errors] = @comment.errors.full_messages
      respond_with @comment
    end

  end

end
