class AddUniqueIndexToUserContacts < ActiveRecord::Migration[7.2]
  def change
    # the line below adds a composite index to apply the uniqueness constraint on the column pair of user_id and contact_id
    # https://api.rubyonrails.org/v7.2/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index
    add_index :user_contacts, [ :user_id, :contact_id ], unique: true
  end
end
