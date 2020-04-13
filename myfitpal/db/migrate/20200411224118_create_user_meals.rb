class CreateUserMeals < ActiveRecord::Migration[6.0]
  def change
    create_table :user_meals do |t|
      t.integer :user_id
      t.integer :meal_id

      t.timestamps
    end
  end
end
