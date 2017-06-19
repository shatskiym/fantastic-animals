class CreateTerrains < ActiveRecord::Migration[5.0]
  def change
    create_table :terrains do |t|
      t.string :element
      t.integer :difficult

      t.timestamps
    end
  end
end
