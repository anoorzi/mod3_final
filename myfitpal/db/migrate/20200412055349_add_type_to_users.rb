class AddTypeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :meals, :type, :string

  end
end
