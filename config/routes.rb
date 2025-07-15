Rails.application.routes.draw do
  devise_for :users
  root "homepage#index"

  namespace :api do
    namespace :v1 do
      get "profiles/search"
      resources :profiles, only: [ :update ]
      resources :chats, only: [ :show ] do
        resources :messages, only: [ :create ]
      end
    end
  end

  # https://stackoverflow.com/questions/71141040/actioncontrollerunknownformat-with-image-http-accept-ruby-on-rails?utm_source=chatgpt.com
  # https://guides.rubyonrails.org/v7.2/routing.html
  get "/*path", to: "homepage#index", constraints: lambda { |req| req.format == :html }

  mount ActionCable.server => "/cable"

  get "hello_world", to: "hello_world#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
