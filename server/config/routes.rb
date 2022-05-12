Rails.application.routes.draw do
  get 'users' => 'users#index'
  resources :users, only: [:index]
end
