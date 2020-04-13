class Api::V1::UsersController < ApplicationController

    def index #/api/v1/users
        @users = User.all
        render({json: @users, status: :ok})    
    end

    def show
        @user = User.find(params[:id])
        render({json: @user, status: :ok})    

    end
    
    def create
        @user = User.create(user_params)
        render({json: @user, status: :created})    

    end



    private

    def user_params
        params.require(:user).permit(:name, :email, :profilepic)
    end


end
