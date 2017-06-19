class CreateAnimals < ActiveRecord::Migration[5.0]
  def change
    create_table :animals do |t|
      t.string :name
      t.string :element
      t.string :power_type
      t.integer :life
      t.integer :will

      t.timestamps
    end
  end
end
