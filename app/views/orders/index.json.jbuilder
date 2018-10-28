json.array! @orders do |order|
  json.id order.id
  json.amount order.amount
  json.service_tax order.service_tax
  json.total_amount order.total_amount
  json.user_name order.user.name
end
