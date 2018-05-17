class V1::GamesController < ApplicationController
  def index
    games = Game.all
    render json: games.as_json
  end

  def create
    game = Game.new(
      name: params[:name],
      genre: params[:genre],
      description: params[:description],
    )
    if game.save
      render json: event.as_json
    else
      render json: {errors: game.errors.full_messages}, status: :bad_request
    end
  end

  def show
    game = Game.find_by(id: params[:id])
    render json: game.as_json
  end
end
