class CreateSpells < ActiveRecord::Migration[5.0]
  def change
    create_table :spells do |t|
      t.string :type
      t.string :characteristic

      t.timestamps
    end
  end
end
