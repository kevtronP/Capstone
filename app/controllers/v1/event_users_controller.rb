class V1::EventUsersController < ApplicationController

  def index
    event_users = EventUser.all
    render json: event_users.as_json
  end

  def create

    event_user = EventUser.new(
      user_id: current_user.id,
      event_id: params[:event_id]
    )
    
    if event_user.save
      render json: event_user.as_json
    else
      render json: {errors: event_user.errors.full_messages}, status: :bad_request
    end
  end
  
end
