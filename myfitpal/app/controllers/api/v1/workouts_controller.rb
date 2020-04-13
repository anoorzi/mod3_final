class Api::V1::WorkoutsController < ApplicationController
    def index #/api/v1/users
        @workouts = Workout.all
        render({json: @workouts, status: :ok})    
    end

    def show
        @workout = Workout.find(params[:id])
        render({json: @workout, status: :ok})    

    end
    
    def create
        @workout = Workout.create(workout_params)
        render({json: @workout, status: :created})    

    end



    private

    def workout_params
        params.require(:workout).permit(:name, :calories, :imgurl)
    end
end
