function doSearchInputHtml() {

  html = '<div class="col-10">';
  html += '<input class="form-control" type="search" placeholder="Tílulo..." aria-label="Search">';
  html += '</div>';
  html += '<div class="col-2">';
  html += '<button class="btn btn-outline-purple" id="searchNote" >Procurar</button>';
  html += '</div>';

  $('#searchInput').html(html);
  
}
