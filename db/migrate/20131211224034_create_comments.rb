class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false
      t.integer :parent_comment_id
      t.integer :photo_id, null: false
      t.string  :body, null: false

      t.timestamps
    end

    add_index :comments, :commenter_id
    add_index :comments, :parent_comment_id
    add_index :comments, :photo_id

  end
end
