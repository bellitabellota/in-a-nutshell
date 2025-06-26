class CreateMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :messages do |t|
      t.references :chat, null: false, foreign_key: true
      t.references :author, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
