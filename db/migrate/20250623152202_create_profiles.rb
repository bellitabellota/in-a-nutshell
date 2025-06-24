class CreateProfiles < ActiveRecord::Migration[7.2]
  def change
    create_table :profiles do |t|
      t.string :name
      t.text :info
      t.string :connect_token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :profiles, :connect_token, unique: true
  end
end
