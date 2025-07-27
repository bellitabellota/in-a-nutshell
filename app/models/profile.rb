class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :picture, dependent: :destroy

  validates :name, uniqueness: true, presence: true
  validates :connect_token, presence: true
end
