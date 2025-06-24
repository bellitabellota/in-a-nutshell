class User < ApplicationRecord
  after_create :create_profile

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 8 }

  has_one :profile, dependent: :destroy

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
