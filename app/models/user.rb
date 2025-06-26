class User < ApplicationRecord
  after_create :create_profile

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 8 }

  has_one :profile, dependent: :destroy

  has_many :user_contacts, dependent: :destroy
  has_many :contacts, through: :user_contacts
  has_many :inverse_user_contacts, class_name: "UserContact", foreign_key: "contact_id", dependent: :destroy

  has_many :chats_as_user_a, class_name: "Chat", foreign_key: "user_a_id", dependent: :destroy
  has_many :chats_as_user_b, class_name: "Chat", foreign_key: "user_b_id", dependent: :destroy

  def chats
    Chat.where("user_a_id = ? OR user_b_id = ?", id, id)
  end

  private

  def create_profile
    token = generate_unique_token
    @profile = self.build_profile(name: self.email, connect_token: token)
    @profile.save
  end

  def generate_unique_token
    loop do
      token = SecureRandom.hex(10)
      break token unless Profile.exists?(connect_token: token)
    end
  end
end
