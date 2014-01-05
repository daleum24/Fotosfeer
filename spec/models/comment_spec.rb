require 'spec_helper'

describe Comment do
  context "without commenter_id, body, photo_id" do
    let(:incomplete_comment) { comment = Comment.new }
    
    it "validates presence of commenter_id" do
      expect(incomplete_comment).to have(1).error_on(:commenter_id)
    end
    
    it "validates presence of body" do
      expect(incomplete_comment).to have(1).error_on(:body)
    end
    
    it "validates presence of photo_id" do
      expect(incomplete_comment).to have(1).error_on(:photo_id)
    end
    
  end
  
  describe "associations" do
    it { should belong_to(:commenter) }
    it { should belong_to(:photo) }
    it { should belong_to(:parent_comment) }
    it { should have_many(:child_comments) }
  end
end
