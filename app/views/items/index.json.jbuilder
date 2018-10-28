json.array! @items do |item|
  json.id item.id
  json.name item.name
  json.price item.price
  json.predicted_value item.predicted_value
end
