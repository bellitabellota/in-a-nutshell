class UserContact < ApplicationRecord
  belongs_to :user
  belongs_to :contact, class_name: "User"

  after_create :create_inverse_if_not_exists
  after_create :create_chat_if_not_exists

  private

  def inverse_exists?
    UserContact.exists?(user: self.contact, contact: self.user)
  end

  def create_inverse_if_not_exists
    UserContact.create(user: self.contact, contact: self.user) unless inverse_exists?
  end

  def chat_exists?
    Chat.exists?(user_a_id: user.id, user_b_id: contact.id) || Chat.exists?(user_a_id: contact.id, user_b_id: user_id)
  end

  def create_chat_if_not_exists
    Chat.create(user_a_id: user.id, user_b_id: contact.id) unless chat_exists?
  end
end
