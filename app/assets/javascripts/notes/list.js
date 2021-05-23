function doNotesHtml(currentUserId) {
  console.log("Hello from do Notes HTML");
  fetchNotesIndex();

  function fetchNotesIndex() {

    $.ajax({
      url: '/api/v1/notes',
      method: 'GET',
      dataType: 'json',
      data: { note: { user_id: currentUserId } },
      success: function (response) {
        notes = response;
        console.log("Hello from do succes fetch")
        doTableHtml();
      },
      error: function (xhr) {
        console.log("Erro ao listar anotações");
      }
    });
  }

  function doTableHtml() {
    html = '<table class="table">';
    html += '<thead>';
    html += '<tr>';
    html += '<th scope="col">#</th>';
    html += '<th scope="col">Título</th>';
    html += '<th scope="col">Data</th>';
    html += '<th scope="col">Prioridade</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += '<tr>';
    $.each(notes, function (i, note) {
      html += '<th scope="row"></th>';
      html += '<td>' + note.title + '</td>';
      html += '<td>' + note.date + '</td>';
      html += '<td>' + note.priority + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';

    console.log("Hello from do table html")

    $('#indexNotesTable').html(html);
  }
}
