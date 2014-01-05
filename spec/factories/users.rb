# Read about factories at https://github.com/thoughtbot/factory_girl
require "faker"

FactoryGirl.define do
  factory :user do
    username do
      Faker::Internet.user_name
    end
    
    email do
      Faker::Internet.email
    end
    
    password "password"
  end
end
