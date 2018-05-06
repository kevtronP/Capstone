class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :phone
      t.text :bio
      t.integer :game_id
      t.string :twitter_handle
      t.string :facebook_link

      t.timestamps
    end
  end
end
