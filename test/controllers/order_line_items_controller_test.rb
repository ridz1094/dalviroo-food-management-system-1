require 'test_helper'

class OrderLineItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @order_line_item = order_line_items(:one)
  end

  test "should get index" do
    get order_line_items_url
    assert_response :success
  end

  test "should get new" do
    get new_order_line_item_url
    assert_response :success
  end

  test "should create order_line_item" do
    assert_difference('OrderLineItem.count') do
      post order_line_items_url, params: { order_line_item: {  } }
    end

    assert_redirected_to order_line_item_url(OrderLineItem.last)
  end

  test "should show order_line_item" do
    get order_line_item_url(@order_line_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_order_line_item_url(@order_line_item)
    assert_response :success
  end

  test "should update order_line_item" do
    patch order_line_item_url(@order_line_item), params: { order_line_item: {  } }
    assert_redirected_to order_line_item_url(@order_line_item)
  end

  test "should destroy order_line_item" do
    assert_difference('OrderLineItem.count', -1) do
      delete order_line_item_url(@order_line_item)
    end

    assert_redirected_to order_line_items_url
  end
end
