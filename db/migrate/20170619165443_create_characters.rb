class CreateCharacters < ActiveRecord::Migration[5.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :clas
      t.integer :power
      t.integer :intelligence
      t.integer :agility
      t.integer :health

      t.timestamps
    end
  end
end
