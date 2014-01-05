require 'spec_helper'

describe Favorite do
  context "without user_id and photo_id" do
    let(:incomplete_favorite) { favorite = Favorite.new }
    
    it "validates presence of user_id" do
      expect(incomplete_favorite).to have(1).error_on(:user_id)
    end
    
    it "validates presence of photo_id" do
      expect(incomplete_favorite).to have(1).error_on(:photo_id)
    end
  end
  
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:photo) }
  end
end
