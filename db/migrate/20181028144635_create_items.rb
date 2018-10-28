class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string :name
      t.float :price, :null => false, :default => 0
      t.integer :predicted_value
      t.timestamps
    end
  end
end
