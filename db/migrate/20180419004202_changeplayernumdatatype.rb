class Changeplayernumdatatype < ActiveRecord::Migration[5.1]
  def change
    change_column :games, :num_players, :string
    change_column :events, :num_players, :string
  end
end
