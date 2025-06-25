class UserContact < ApplicationRecord
  belongs_to :user
  belongs_to :contact, class_name: "User"

  after_create :create_inverse_if_not_exists

  private

  def inverse_exists?
    UserContact.exists?(user: self.contact, contact: self.user)
  end

  def create_inverse_if_not_exists
    UserContact.create(user: self.contact, contact: self.user) unless inverse_exists?
  end
end
