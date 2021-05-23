class Api::V1::NotesController < ApplicationController
  
  # skip_before_action :verify_authenticity_token

  def index
    render json: Note.where(user: note_params[:user_id]).to_json
  end
  
  def create
    # params[:note] = params[:note].merge(user_id: current_user.id)
    @note = Note.create(note_params)
    if @note.id 
      render json: @note.to_json
    else
      render json: @note.errors
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.update!(note_params)
    render json: @note.to_json
  end

  def destroy
    @note = Note.find(note_params[:id])
    if @note.destroy
      render json: "Anotação destruída com sucesso"
    else
      render json: "Algum problema ao destruír a anotação"
    end
  end
  

  private

    def note_params
      params.require(:note).permit(:title, :note, :date, :priority, :user_id)
    end

end
