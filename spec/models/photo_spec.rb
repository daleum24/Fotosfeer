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
  
  describe "comments_by_parent_id" do
    user = FactoryGirl.create(:user)
    
    photo1 = Photo.new({ submitter_id: user.id, 
                                title: "Photo 1", 
                             latitude: 40,
                            longitude: 73 })
    photo1.image = File.open(Rails.root.join('spec', 'fixtures', 'photo_1.JPG'))
    photo1.save!
    
    comment1 = FactoryGirl.create(:comment, commenter_id: user.id, photo_id: photo1.id)
    comment2 = FactoryGirl.create(:comment, commenter_id: user.id, photo_id: photo1.id, parent_comment_id: comment1.id)
    comment3 = FactoryGirl.create(:comment, commenter_id: user.id, photo_id: photo1.id, parent_comment_id: comment2.id)
    
    it "returns appropriate key-value pairings" do
      expect(photo1.comments_by_parent_id[nil]).to eq([comment1])
      expect(photo1.comments_by_parent_id[comment1.id]).to eq([comment2])
      expect(photo1.comments_by_parent_id[comment2.id]).to eq([comment3])
    end
  
  end
  
end







