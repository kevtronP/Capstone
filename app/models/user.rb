class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :events, through: :event_users

  def as_json
    {
      name: name,
      email: email,
      phone: phone,
      bio: bio,
      twitter_handle: twitter_handle,
      facebook_link: facebook_link
    }
  end
end
