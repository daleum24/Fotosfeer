class CreateRegions < ActiveRecord::Migration
  def change
    create_table :regions do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      
      t.timestamps
    end
    add_index :regions, :user_id
    add_index :regions, :latitude
    add_index :regions, :longitude
  end
end
