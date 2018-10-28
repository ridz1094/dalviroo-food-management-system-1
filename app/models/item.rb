class Item < ApplicationRecord
  validates :name, presence: true
  validates :price, numericality: true, presence: true

  has_many :order_line_items
  has_many :orders, through: :order_line_items
end
