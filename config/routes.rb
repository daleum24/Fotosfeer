ImgurClone::Application.routes.draw do
  root :to => 'sessions#new'

  resources :users, only: [:new, :create]

  resource :session, only: [:new, :create, :destroy]

  resources :photos, only: [:index]

  resource :password_reset, only: [:new, :create, :edit, :update]

end
