class Api::V1::MealsController < ApplicationController
 
    def index #/api/v1/users
        @meals = Meal.all
        render({json: @meals, status: :ok})    
    end
    
    def show
        @meal = Meal.find(params[:id])
        render({json: @meal, status: :ok})    

    end
    
    def create
        @meal = Meal.create(meal_params)
        render({json: @meal, status: :created})    

    end



    private

    def meal_params
        params.require(:meal).permit(:name, :calories, :imgurl)
    end
end
