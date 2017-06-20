Rails.application.routes.draw do
  resources :spells
  resources :items
  resources :characters
  resources :terrains do
    collection do
      get 'field'
    end
  end
  resources :animals

  root to: 'animals#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
