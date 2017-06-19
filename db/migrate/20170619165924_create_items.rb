class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.float :weight
      t.string :type
      t.string :name
      t.string :characteristic

      t.timestamps
    end
  end
end
