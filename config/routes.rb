Rails.application.routes.draw do
  devise_for :users
  resources :order_line_items do
    member do
      get 'change_order_status'
    end
    collection do
      get 'download_report'
    end
  end
  resources :orders
  resources :items
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#index'
end
