class User < ApplicationRecord
    has_many :user_meals
    has_many :meals, through: :user_meals

    has_many :user_workouts
    has_many :workouts, through: :user_workouts

end
