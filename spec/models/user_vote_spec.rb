require 'spec_helper'

describe UserVote do
  context "without value, user_id or photo_id" do
    let(:incomplete_user_vote) { user_vote = UserVote.new }
    
    it "validates presence of value" do
      expect(incomplete_user_vote).to have(1).error_on(:value)
    end
    
    it "validates presence of user_id" do
      expect(incomplete_user_vote).to have(1).error_on(:user_id)
    end
    
    it "validates presence of photo_id" do
      expect(incomplete_user_vote).to have(1).error_on(:photo_id)
    end
  
  end
  
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:photo) }
  end
end
