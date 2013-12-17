class UserVotesController < ApplicationController
  def index
    @photo = Photo.find(params[:photo_id])
    @uservotes = @photo.uservotes
    
    respond_with @uservotes
  end
end
