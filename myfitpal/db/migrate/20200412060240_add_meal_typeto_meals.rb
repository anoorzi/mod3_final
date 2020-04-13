class AddMealTypetoMeals < ActiveRecord::Migration[6.0]
  def change
    add_column :meals, :mealtype, :string

  end
end
