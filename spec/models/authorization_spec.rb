require 'spec_helper'

describe Authorization do
  context "without provider, uid or user_id" do
    let(:incomplete_authorization) { authorization = Authorization.new }
    
    it "validates presence of provider" do
      expect(incomplete_authorization).to have(1).error_on(:provider)
    end 
    
    it "validates presence of uid" do
      expect(incomplete_authorization).to have(1).error_on(:uid)
    end
    
    it "validates presence of user_id" do
      expect(incomplete_authorization).to have(1).error_on(:user_id)
    end  
  end
  
  describe "associations" do
    it { should belong_to(:user) }
  end
end
