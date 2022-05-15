Rails.application.routes.draw do
  get 'users', to: 'users#index' as: 'users'
  resources :users, only: [:index]
end
