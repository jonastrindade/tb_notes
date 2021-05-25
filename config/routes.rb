Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/anotacoes", to: "web/welcomes#index"
  root 'web/welcomes#index'
  resources :tests, path: '/tests', only: [:index, :show], controller: 'web/tests'

  namespace :api do
    namespace :v1 do
      resources :notes
    end
  end
end
