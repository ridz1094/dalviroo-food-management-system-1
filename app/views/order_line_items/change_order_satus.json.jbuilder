json.array! @order_line_items do |order_line_item|
  json.item_id order_line_item.item_id
  json.item_name order_line_item.item.name
  json.item_predicted_value order_line_item.item.predicted_value
  json.total_quantity order_line_item.total_quantity
  json.created_till_now order_line_item.created_till_now if order_line_item.try(:created_till_now).present?
end
