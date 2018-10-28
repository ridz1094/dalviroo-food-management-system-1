class Order < ApplicationRecord
  has_many :order_line_items, dependent: :destroy
  has_many :items, through: :order_line_items
  accepts_nested_attributes_for :order_line_items, allow_destroy: true
  belongs_to :user
end
