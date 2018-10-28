class OrderLineItem < ApplicationRecord
  belongs_to :order
  belongs_to :item
  has_many :items, class_name: 'Item', foreign_key: 'id'

  enum status: [:inprogress, :done]

  validates :quantity, presence: true

  def self.by_date(date)
    date =  Time.zone.parse(date.to_s)
    where("order_line_items.created_at >= ?", date)
  end
end
