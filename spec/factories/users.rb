# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    username "user1"
    email    "user1@gmail.com"
    password "password"
  end
end
