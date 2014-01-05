require 'spec_helper'

describe Photo do
  context "without submitter_id, title, latitude, longitude" do
    let(:incomplete_photo) { photo = Photo.new }
    
    it "validates presence of submitter_id" do
      expect(incomplete_photo).to have(1).error_on(:submitter_id)
    end
    
    it "validates presence of title" do
      incomplete_photo.save
      expect(incomplete_photo.title).to eq("Untitled")
    end
    
    it "validates presence of latitude" do
      expect(incomplete_photo).to have(1).error_on(:latitude)
    end
    
    it "validates presence of longitude" do
      expect(incomplete_photo).to have(1).error_on(:longitude)
    end
    
    it "validates presence of image attachment" do
      expect(incomplete_photo).to have(1).error_on(:image)
    end
    
  end
  
  describe "associations" do
    it { should belong_to(:submitter) }
    it { should have_many(:comments) }
    it { should have_many(:uservotes) }
    it { should have_many(:favorites) }
    it { should have_many(:favoring_users) }
  end
end







