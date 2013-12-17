ImgurClone::Application.routes.draw do
  root :to => 'sessions#new'
  
  get "auth/facebook/callback" => "sessions#create"
  
  resources :home, only: [:index]

  resources :users, only: [:new, :create] do
    resources :photos, only: [:create]
    
    resources :regions, only: [:index, :new, :create]

    member do
      get "favorites"
      get "uploaded_images"
    end
  end

  resource :session, only: [:new, :create, :destroy]

  resources :photos, only: [:index, :show, :update, :destroy] do
    resources :comments,  only: [:new, :create]
    resources :favorites, only: [:create]

    member do
      post "upvote"
      post "downvote"
    end
  end

  resources :regions, only: [:show, :edit, :update, :destroy]
  resources :comments,  only: [:destroy]
  resources :favorites, only: [:destroy]

  resource :password_reset, only: [:new, :create, :edit, :update]

end
