class AddBoundsToRegion < ActiveRecord::Migration
  def change
    remove_column :regions, :latitude
    remove_column :regions, :longitude
    add_column    :regions, :north_bound, :float, {null: false}
    add_column    :regions, :south_bound, :float, {null: false}
    add_column    :regions, :east_bound, :float, {null: false}
    add_column    :regions, :west_bound, :float, {null: false}
  end
end
