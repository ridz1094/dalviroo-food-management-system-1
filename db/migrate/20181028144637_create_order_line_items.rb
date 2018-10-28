class CreateOrderLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_line_items do |t|
      t.belongs_to :order, index: true
      t.belongs_to :item, index: true
      t.integer :quantity, :null => false, :default => 0
      t.integer :status, :null => false, :default => 0
      t.timestamps
    end
  end
end
