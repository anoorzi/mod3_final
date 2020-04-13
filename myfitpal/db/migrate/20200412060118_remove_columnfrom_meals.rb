class RemoveColumnfromMeals < ActiveRecord::Migration[6.0]
  def change
    remove_column :meals, :type, :string

  end
end
