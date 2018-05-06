class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :datetime
      t.string :address
      t.integer :user_id
      t.integer :game_id
      t.integer :num_players

      t.timestamps
    end
  end
end
