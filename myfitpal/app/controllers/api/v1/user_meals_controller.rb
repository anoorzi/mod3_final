class Api::V1::UserMealsController < ApplicationController

    def index #/api/v1/users
        @user_meals = UserMeal.all
        render({json: @user_meals, status: :ok})  
        
    end


    def show
        @user_meal = UserMeal.find(params[:id])
        render({json: @user_meal, status: :ok})    

    end
    
    def create
        @user_meal = UserMeal.create(user_meal_params)
        render({json: @user_meal, status: :created})    

    end

    def destroy
        @user_meal = UserMeal.find(params[:id])
        @user_meal.destroy
        render({json: @user_meal})    

    
    end



    private

    def user_meal_params
        params.require(:user_meal).permit(:user_id, :meal_id, :typeofmeal)
    end

end
