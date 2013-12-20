class FavoritesController < ApplicationController
  respond_to :json

  def create
    @favorite = Favorite.new(photo_id: params[:photo_id])
    @favorite.user_id = self.current_user.id
    @favorite.save
    render json: @favorite
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.destroy
    respond_with @favorite
  end

end
