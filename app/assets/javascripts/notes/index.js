function doNotesHtml() {
  fetchNotesIndex();
}

function fetchNotesIndex() {

  $.ajax({
    url: '/api/v1/notes',
    method: 'GET',
    dataType: 'json',
    data: { note: { user_id: currentUserId } },
    success: function (response) {
      notes = response;
      doTableHtml();
    },
    error: function (xhr) {
      console.log("Erro ao listar anotações");
    }
  });
}

function doTableHtml() {
  html = '<table class="table" id="table">';
  html += '<thead>';
  html += '<tr>';
  html += '<th scope="col">#</th>';
  html += '<th scope="col">Título</th>';
  html += '<th scope="col">Data</th>';
  html += '<th scope="col">Prioridade</th>';
  html += '<th scope="col">Editar</th>';
  html += '<th scope="col">Apagar</th>';
  html += '</tr>';
  html += '</thead>';
  html += '<tbody>';
  html += '<tr>';
  $.each(notes, function (i, note) {
    date = note.date.split("T")[0].split("-")
    datePretty = date[2] + "/" + date[1] + "/" + date[0]
    priority = note.priority.charAt(0).toUpperCase() + note.priority.slice(1) 

    html += '<th scope="row"></th>';
    html += '<td>' + note.title + '</td>';
    html += '<td>' + datePretty + '</td>';
    html += '<td>' + priority + '</td>';
    html += '<td>'
    html += '<button type="button" id="' + note.id + '" class="update-button btn btn-outline-purple btn-sm d-flex justify-content-center align-content-between">'
    html += '<span id="' + note.id + '" class="material-icons icon-purple">edit</span>';
    html += '</button>'
    html += '</td>'
    html += '<td>'
    html += '<button type="button" id="' + note.id + '" class="delete-button btn btn-outline-red btn-sm d-flex justify-content-center align-content-between">'
    html += '<span id="' + note.id + '" class="material-icons icon-red">delete</span>';
    html += '</button>'
    html += '</td>'
    html += '</tr>';
  });
  html += '</tbody>';
  html += '</table>';

  $('#indexNotesTable').html(html);

  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $( ".update-button" ).on("click", function() {
    doUpdateHtml(event.target.id);
  });

  $( ".delete-button" ).on("click", function() {
    deleteNote(event.target.id);
  });
}

