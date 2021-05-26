function doCreateNotesHtml() {
  doFormHtml();
}

function doFormHtml() {
  html = '<form>';
  html += '<div class="form-group mt-4">';
  html += '<label for="exampleFormControlInput1">Título</label>';
  html += '<input required type="title" class="form-control" id="title" placeholder="">';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="priority">Prioridade</label>';
  html += '<select class="form-control" id="priority">';
  html += '<option>Low</option>';
  html += '<option>Medium</option>';
  html += '<option>High</option>';
  html += '</select>';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="date" class="col-form-label">Data</label>';
  html += '<input required class="form-control" type="date" value="2021-05-24" id="date">';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="note">Anotações</label>';
  html += '<textarea class="form-control" id="note" rows="15"></textarea>';
  html += '</div>';
  html += '</form>';
  html += '<div class="form-group mt-2">';
  html += '<button class="btn btn-outline-purple" style="margin-right: 10px;" id="cancelButton" type="submit">Cancelar</button>';
  html += '<button class="btn btn-outline-purple" id="fetchNote" type="submit">Criar</button>';
  html += '</div>';


  cleanHtml = ""
  type = "new"

  $('#searchInput').html(cleanHtml);
  $('#indexNotesTable').html(cleanHtml);
  $('#createButton').html(cleanHtml);
  $('#createNoteForm').html(html);

  $( "#cancelButton" ).on("click", function() {
    doIndexHtml();
  });

  $( "#fetchNote" ).on("click", function() {
    doJsonData();
  });
}

function doCreateNoteButtonHtml() {
  html = '<button class="btn btn-outline-purple" id="createNote" type="submit">Nova anotação</button>';
  $('#createButton').html(html);

  $( "#createNote" ).on("click", function() {
    doCreateNotesHtml();
  });
}

function doIndexHtml() {
  cleanHtml = ""
  $('#createNoteForm').html(cleanHtml);
  doSearchInputHtml();
  doCreateNoteButtonHtml();
  doNotesHtml(); 
}

function doUpdateHtml(noteId) {
  html = '<form>';
  html += '<div class="form-group mt-4">';
  html += '<label for="exampleFormControlInput1">Título</label>';
  html += '<input required type="title" class="form-control" id="title" placeholder="">';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="priority">Prioridade</label>';
  html += '<select class="form-control" id="priority">';
  html += '<option>Low</option>';
  html += '<option>Medium</option>';
  html += '<option>High</option>';
  html += '</select>';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="date" class="col-form-label">Data</label>';
  html += '<input required class="form-control" type="date" value="2021-05-24" id="date">';
  html += '</div>';
  html += '<div class="form-group mt-2">';
  html += '<label for="note">Anotações</label>';
  html += '<textarea class="form-control" id="note" rows="15"></textarea>';
  html += '</div>';
  html += '</form>';
  html += '<div class="form-group mt-2">';
  html += '<button class="btn btn-outline-purple" style="margin-right: 10px;" id="cancelButton" type="submit">Cancelar</button>';
  html += '<button class="btn btn-outline-purple" id="fetchNote" type="submit">Atualizar</button>';
  html += '</div>';


  cleanHtml = ""
  type = "edit"

  $('#searchInput').html(cleanHtml);
  $('#indexNotesTable').html(cleanHtml);
  $('#createButton').html(cleanHtml);
  $('#createNoteForm').html(html);

  $.each(notes, function (i, note) {
    if(note.id == noteId) {
      findedNote = note;
    }
  });
  
  $( "input#title" ).val(findedNote.title)
  $( "select#priority" ).val(findedNote.priority.charAt(0).toUpperCase() + findedNote.priority.slice(1))
  $( "input#date" ).val(findedNote.date.split("T")[0])
  $( "textarea#note" ).val(findedNote.note)

  $( "#cancelButton" ).on("click", function() {
    doIndexHtml();
  });

  $( "#fetchNote" ).on("click", function() {
    doJsonData();
  });
}

function doJsonData() {
  title = $( "input#title" ).val();
  priority = $( "select#priority" ).val().toLowerCase();
  date = $( "input#date" ).val();
  note = $( "textarea#note" ).val();
  data = {title: title, priority: priority, date: date, note: note, user_id: currentUserId}
  
  requestSave(data);
}

function requestSave(data) {
  if(type == "new") {
    url = '/api/v1/notes';
    method = 'POST';
  } else if (type == "edit") {
    url = "/api/v1/notes/" + findedNote.id ;
    method = 'PUT';
  }
  $.ajax({
    url: url,
    method: method,
    dataType: 'json',
    data: { note: data},
    success: function (response) {
      doIndexHtml();
    },
    error: function (xhr) {
      console.log("Erro ao criar/atualizar anotação");
    }
  });
}

function deleteNote(noteId) {
  $.ajax({
    url: '/api/v1/notes/' + noteId,
    method: 'DELETE',
    success: function (response) {
      notes = response;
      doIndexHtml();
    },
    error: function (xhr) {
      console.log("Erro ao apagar anotação");
    }
  });
}