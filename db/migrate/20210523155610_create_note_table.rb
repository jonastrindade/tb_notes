class CreateNoteTable < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.timestamps
      t.text :title
      t.text :note
      t.datetime :date
      t.integer :prority
      t.references :user
    end
  end
end
