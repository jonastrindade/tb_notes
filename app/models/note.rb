class Note < ApplicationRecord
  
  # Relations
  belongs_to :user, class_name: "User", foreign_key: "user_id"

  # Validation
  validates :title, presence: { message: "Título deve existir." }
  validates :note, presence: { message: "Anotação deve existir." }
  validates :date, presence: { message: "Data deve existir." }
  validates :priority, presence: { message: "Prioridade deve existir." }

  # Action

  # Enum
  enum priority: { low: 0, medium: 1, high: 2 }
  
end
