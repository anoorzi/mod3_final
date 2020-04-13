class Api::V1::UserWorkoutsController < ApplicationController
    def index #/api/v1/users
        @user_workouts = UserWorkout.all
        render({json: @user_workouts, status: :ok})    
    end

    def show
        @user_workout = UserWorkout.find(params[:id])
        render({json: @user_workout, status: :ok})    

    end
    
    def create
        @user_workout = UserWorkout.create(user_workout_params)
        render({json: @user_workout, status: :created})    

    end

    def destroy
        @user_workout = UserWorkout.find(params[:id])
        @user_workout.destroy
        render({json: @user_workout})    

    
    end



    private

    def user_workout_params
        params.require(:user_workout).permit(:user_id, :workout_id)
    end
end
