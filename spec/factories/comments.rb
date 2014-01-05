# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :comment do  
    commenter_id 1
    parent_comment_id nil
    photo_id 1
    body do 
      Faker::Lorem.sentence
    end
  end
end
