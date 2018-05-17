class Event < ApplicationRecord
  belongs_to :game
  has_many :event_users
  has_many :users, through: :event_users

  def as_json
    {
      id: id,
      name: name,
      address: address,
      datetime: datetime,
      game_id: game_id,
      game: game.as_json,
      num_players: num_players,
      description: description,
      users: users.as_json

    }
  end
end
