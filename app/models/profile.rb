class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :picture, dependent: :destroy

  validates :connect_token, presence: true
end
