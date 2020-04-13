class Removetypeof < ActiveRecord::Migration[6.0]
  def change
    remove_column :meals, :mealtype, :string

  end
end
