# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131216043919) do

  create_table "authorizations", :force => true do |t|
    t.string   "provider",   :null => false
    t.string   "uid",        :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "authorizations", ["provider", "uid"], :name => "index_authorizations_on_provider_and_uid", :unique => true
  add_index "authorizations", ["user_id"], :name => "index_authorizations_on_user_id"

  create_table "comments", :force => true do |t|
    t.integer  "commenter_id",      :null => false
    t.integer  "parent_comment_id"
    t.integer  "photo_id",          :null => false
    t.string   "body",              :null => false
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "comments", ["commenter_id"], :name => "index_comments_on_commenter_id"
  add_index "comments", ["parent_comment_id"], :name => "index_comments_on_parent_comment_id"
  add_index "comments", ["photo_id"], :name => "index_comments_on_photo_id"

  create_table "favorites", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "photo_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "favorites", ["photo_id"], :name => "index_favorites_on_photo_id"
  add_index "favorites", ["user_id", "photo_id"], :name => "index_favorites_on_user_id_and_photo_id", :unique => true
  add_index "favorites", ["user_id"], :name => "index_favorites_on_user_id"

  create_table "photos", :force => true do |t|
    t.integer  "submitter_id",       :null => false
    t.string   "title",              :null => false
    t.string   "description"
    t.float    "latitude",           :null => false
    t.float    "longitude",          :null => false
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "photos", ["latitude"], :name => "index_photos_on_latitude"
  add_index "photos", ["longitude"], :name => "index_photos_on_longitude"
  add_index "photos", ["submitter_id"], :name => "index_photos_on_submitter_id"

  create_table "regions", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "user_id",    :null => false
    t.float    "latitude",   :null => false
    t.float    "longitude",  :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "regions", ["latitude"], :name => "index_regions_on_latitude"
  add_index "regions", ["longitude"], :name => "index_regions_on_longitude"
  add_index "regions", ["user_id"], :name => "index_regions_on_user_id"

  create_table "user_votes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "photo_id",   :null => false
    t.integer  "value",      :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "user_votes", ["photo_id"], :name => "index_user_votes_on_photo_id"
  add_index "user_votes", ["user_id", "photo_id"], :name => "index_user_votes_on_user_id_and_photo_id", :unique => true
  add_index "user_votes", ["user_id"], :name => "index_user_votes_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username",             :null => false
    t.string   "email",                :null => false
    t.string   "password_digest",      :null => false
    t.string   "session_token",        :null => false
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "password_reset_token"
    t.string   "ip_address"
    t.float    "latitude"
    t.float    "longitude"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token"
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
