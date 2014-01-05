require 'spec_helper'

describe User do
  
  context "without username or email" do
    let(:incomplete_user) { user = User.new }
    
    it "validates presence of username" do
      expect(incomplete_user).to have(1).error_on(:username)
    end
    
    it "provides correct error message when no username is provided" do 
      expect(incomplete_user.errors_on(:username)).to include("can't be blank")
    end
    
    it "validates presence of email" do
      expect(incomplete_user).to have(1).error_on(:email)
    end
    
    it "provides correct error message when no email is provided" do 
      expect(incomplete_user.errors_on(:email)).to include("can't be blank")
    end
  end
  
  context "with invalid password" do
    it "validates length of password" do
      expect(FactoryGirl.build(:user, password: "")).not_to be_valid
      expect(FactoryGirl.build(:user, password: "apple")).not_to be_valid
    end
    
    it "provides correct error message when invalid password is provided" do 
      expect(FactoryGirl.build(:user, password: "apple").errors_on(:password)).to include("is too short (minimum is 6 characters)")
    end
  end
  
  context "with duplicate email or username" do 
    it "validates uniqueness of email" do
      user1 = FactoryGirl.create(:user)
      user2 = User.new({ email: user1.email, username: Faker::Internet.user_name, password: "password" })  
      expect(user2).not_to be_valid
    end
  
    it "validates uniqueness of username" do
      user1 = FactoryGirl.create(:user)
      user2 = User.new({ email: Faker::Internet.email, username: user1.username, password: "password" })
      expect(user2).not_to be_valid
    end
  end
  
  describe "associations" do
    it { should have_many(:authorizations) }
    it { should have_many(:submitted_photos) }
    it { should have_many(:comments) }
    it { should have_many(:uservotes) }
    it { should have_many(:favorites) }
    it { should have_many(:favorite_photos) }
    it { should have_many(:regions) }
  end
  
  describe "favorited_photos" do
    
    user = FactoryGirl.create(:user)
    photo1 = Photo.new({ submitter_id: user.id, 
                                title: "Photo 1", 
                             latitude: 40,
                            longitude: 73 })
    photo1.image = File.open(Rails.root.join('spec', 'fixtures', 'photo_1.JPG'))
    photo1.save!
  
    photo2 = Photo.new({ submitter_id: user.id, 
                                title: "Photo 1", 
                             latitude: 40,
                            longitude: 73 })
    photo2.image = File.open(Rails.root.join('spec', 'fixtures', 'photo_1.JPG'))
    photo2.save!
  
    Favorite.create({ user_id: user.id, photo_id: photo1.id })
    
    it "includes only favorited photos" do 
      expect(user.favorited_photos).to include(photo1)
    end
    
    it "does not include non-favorited photos" do 
      expect(user.favorited_photos).to_not include(photo2)
    end
    
  end
  
end










