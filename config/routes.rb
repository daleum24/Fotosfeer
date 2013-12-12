ImgurClone::Application.routes.draw do
  root :to => 'sessions#new'

  resources :users, only: [:new, :create] do
    resources :photos, only: [:new, :create]
  end

  resource :session, only: [:new, :create, :destroy]

  resources :photos, only: [:index, :show, :update] do
    resources :comments, only: [:new, :create]

    member do
      post "upvote"
      post "downvote"
    end
  end

  resources :comments, only: [:destroy]

  resource :password_reset, only: [:new, :create, :edit, :update]

end
