Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  namespace :v1 do
    post "/users" => "users#create"

    get "/events" => "events#index"
    post "/events" => "events#create"
    get "/events/:id" => "events#show"
    patch "/events/:id" => "events#update"
    delete "/events/:id" => "events#destroy"

    get "/games" => "games#index"
    post "/games" => "games#create"
    get "/games/:id" => "games#show"
    patch "/games/:id" => "games#update"
    delete "/games/:id" => "games#destroy"
  end
end