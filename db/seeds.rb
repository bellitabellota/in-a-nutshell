# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

first_user = User.find_or_initialize_by(email: "peter@mail.com")
first_user.assign_attributes(password: "peterpeter")
first_user.save

second_user = User.find_or_initialize_by(email: "olivia@mail.com")
second_user.assign_attributes(password: "oliviaolivia")
second_user.save
