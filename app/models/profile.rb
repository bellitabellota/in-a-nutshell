class Profile < ApplicationRecord
  belongs_to :user

  validates :connect_token, presence: true
end
