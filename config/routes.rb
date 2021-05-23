Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'web/welcomes#index'

  namespace :api do
    namespace :v1 do
      resources :notes
    end
  end
end
