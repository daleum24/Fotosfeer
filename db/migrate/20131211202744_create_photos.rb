class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :submitter_id, null: false
      t.string  :title, null: false
      t.string  :description
      t.integer :latitude, null: false
      t.integer :longitude, null: false

      t.timestamps
    end

    add_index :photos, :submitter_id
    add_index :photos, :latitude
    add_index :photos, :longitude

  end
end
