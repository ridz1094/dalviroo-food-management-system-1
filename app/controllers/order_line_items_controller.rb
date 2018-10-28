require 'spreadsheet'
class OrderLineItemsController < ApplicationController

  # GET /order_line_items
  # GET /order_line_items.json
  def index
    if params[:status].present?
      @order_line_items = OrderLineItem.includes(:item).select("item_id, sum(quantity) as total_quantity").by_date(Date.today).where(status: params[:status]).group("item_id")
    else
      @order_line_items = OrderLineItem.includes(:item).select("item_id, sum(case when status = 0 then quantity else 0 end) as total_quantity, sum(case when status = 1 then quantity else 0 end) as created_till_now").by_date(Date.today).group("item_id")
    end
  end

  def change_order_status
    OrderLineItem.where(item_id: params[:id], status: 0).update_all(status: params[:status])
    @order_line_items = OrderLineItem.where(item_id: params[:id], status: 0)
  end

  def download_report
    book = Spreadsheet::Workbook.new
    format = Spreadsheet::Format.new :weight => :bold
    sheet = book.create_worksheet :name => "Daily Report"
    sheet.insert_row(0, ["Dish Name", "Produced", "Predicted"])
    sheet.row(0).default_format = format
    @order_line_items = OrderLineItem.includes(:item).select("item_id, sum(quantity) as total_quantity").by_date(Date.today).where(status: 1).group("item_id")
    @order_line_items.each_with_index do |order_line_item, index|
      sheet.insert_row(index+1, [order_line_item.item.name, order_line_item.total_quantity, order_line_item.item.predicted_value])
    end
    book.write 'public/xls/report.xls'
    send_file 'public/xls/report.xls', disposition: 'attachment'
  end

end
