class FavoritesController < ApplicationController

  def create
    @favorite = Favorite.new(photo_id: params[:photo_id])
    @favorite.user_id = self.current_user.id
    @favorite.save
    redirect_to @favorite.photo
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @photo = @favorite.photo
    @favorite.destroy
    redirect_to @photo
  end

end
