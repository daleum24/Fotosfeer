class PhotosController < ApplicationController
  before_filter :logged_in?

  def index

  end

  def new
    @photo = Photo.new
  end

  def create

  end

  def show

  end

end
