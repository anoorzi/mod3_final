class AddMealTypetoMealsuser < ActiveRecord::Migration[6.0]
  def change
    add_column :user_meals, :typeofmeal, :string

  end
end
