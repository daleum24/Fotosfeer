ImgurClone::Application.routes.draw do
  root :to => 'sessions#new'

  resources :users, only: [:new, :create] do
    resources :photos, only: [:new, :create]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :photos, only: [:index, :show]

  resource :password_reset, only: [:new, :create, :edit, :update]

end
