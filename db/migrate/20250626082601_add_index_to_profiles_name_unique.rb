class AddIndexToProfilesNameUnique < ActiveRecord::Migration[7.2]
  def change
    add_index :profiles, :name, unique: true
  end
end
