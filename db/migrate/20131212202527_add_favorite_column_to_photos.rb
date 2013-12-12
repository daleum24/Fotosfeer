class AddFavoriteColumnToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :is_favorite, :boolean, default: false
  end
end
