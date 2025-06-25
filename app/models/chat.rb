class Chat < ApplicationRecord
  before_validation :sort_user_ids

  belongs_to :user_a, class_name: "User"
  belongs_to :user_b, class_name: "User"

  private

  def sort_user_ids
    if user_a_id && user_b_id && user_a_id > user_b_id
      # Parallel assignment using destructuring - in ruby there is no need to add the square brackets
      # self.user_a_id, self.user_b_id = [ user_b_id, user_a_id ]
      self.user_a_id, self.user_b_id = user_b_id, user_a_id
    end
  end
end
