function doCreateNotesHtml() {
  doFormHtml();
}

function requestSave(data) {
  $.ajax({
    url: '/api/v1/notes',
    method: 'POST',
    dataType: 'json',
    data: { note: data },
    success: function (response) {
      notes = response;
      doIndexHtml();
    },
    error: function (xhr) {
      console.log("Erro ao listar anotações");
    }
  });
}

function doFormHtml() {
  html = '<form>';
  html += '<div class="form-group mt-4">';
  html += '<label for="exampleFormControlInput1">Título</label>';
  html += '<input type="title" class="form-control" id="title" placeholder="">';
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
  html += '<input class="form-control" type="date" value="2021-05-24" id="date">';
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

  $('#searchInput').html(cleanHtml);
  $('#indexNotesTable').html(cleanHtml);
  $('#createButton').html(cleanHtml);
  $('#createNoteForm').html(html);

  $( "#cancelButton" ).on("click", function() {
    doIndexHtml();
  });

  $( "#fetchNote" ).on("click", function() {
    doSomething();
    // create data
    // fetch create
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

function doSomething() {
  title = $( "input#title" ).val();
  priority = $( "select#priority" ).val().toLowerCase();
  date = $( "input#date" ).val();
  note = $( "textarea#note" ).val();
  data = {title: title, priority: priority, date: date, note: note, user_id: currentUserId}
  requestSave(data);
}