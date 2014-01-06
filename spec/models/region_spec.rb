require 'spec_helper'

describe Region do
  context "without name, user_id or bounds" do
    let(:incomplete_region) { region = Region.new }
    
    it "validates presence of name" do
      expect(incomplete_region).to have(1).error_on(:name)
    end
    
    it "validates presence of user_id" do
      expect(incomplete_region).to have(1).error_on(:user_id)
    end
    
    it "validates presence of north_bound" do
      expect(incomplete_region).to have(1).error_on(:north_bound)
    end
    
    it "validates presence of south_bound" do
      expect(incomplete_region).to have(1).error_on(:south_bound)
    end
    
    it "validates presence of east_bound" do
      expect(incomplete_region).to have(1).error_on(:east_bound)
    end
    
    it "validates presence of west_bound" do
      expect(incomplete_region).to have(1).error_on(:west_bound)
    end
  end
  
  describe "associations" do
    it { should belong_to(:user) }
  end
  
end
