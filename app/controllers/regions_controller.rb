class RegionsController < ApplicationController
  respond_to :json
  
  def index
    @regions = self.current_user.regions
  end
  
  
  def create
    @region = Region.new(params[:region])
    @region.user_id = self.current_user.id
    
    if @region.save
      respond_with @region
    else
      flash[:errors] = @region.errors.full_messages
      respond_with @region
    end
    
  end
  
  
  def destroy
    @region = Region.find(params[:id])
    @region.destroy
    
    respond_with @region
  end
  
end
