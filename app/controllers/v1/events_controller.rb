class V1::EventsController < ApplicationController
  # before_action :authenticate_user, except: [:index, :show]

  def index
    events = Event.all
    render json: events.as_json
  end

  def create
    event = Event.new(
      name: params[:name],
      datetime: params[:datetime],
      address: params[:address],
      user_id: 5,
      game_id: params[:game_id],
      num_players: params[:num_players]
    )
    if event.save
      render json: event.as_json
    else
      render json: {errors: event.errors.full_messages}, status: :bad_request
    end
  end

  def show
    event = Event.find_by(id: params[:id])
    render json: event.as_json
  end

  def update
    event = Event.find_by(id: params[:id])
    event.name = params[:name] || event.name
    event.datetime = params[:datetime] || event.datetime
    event.address = params[:address] || event.address
    event.user_id = current_user.id
    event.game_id = params[:game_id] || event.game_id
    event.num_players = params[:num_players] || event.num_players
    if event.save
      render json: event.as_json
    else
      render json: {errors: event.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    event = Event.find_by(id: params[:id])
    event.destroy
    render json: {message: "Event successfully destroyed!"}
  end
end
