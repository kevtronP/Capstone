class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.string :name
      t.string :genre
      t.text :description
      t.integer :num_players

      t.timestamps
    end
  end
end
