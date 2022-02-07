console.log("Starting up the project gallery");

//gallery-controller file

function onInit() {
  renderProjs();
  $('.btn-contact').click(onContact);
}

function renderProjs() {
  var strHtml = gProjs.map(function (proj) {
      return `
 <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
      <div class="portfolio-hover" onclick="renderModal('${proj.id}')">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/${proj.img}" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${proj.title}</h4>
      <p class="text-muted">${proj.labels.join("")}</p>
    </div>
  </div> 
  `;
    }).join('');
//   var elProj = document.querySelector("proj-list");
//   elProj.innerHTML = strHtml;

  $('.proj-list').html(strHtml)
}

function renderModal(id) {
  var proj = getProjById(id);
  var strHtml = `
    <h2>${proj.title}</h2>
    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.img}" alt="">
    <p>${proj.desc}</p>
    <ul class="list-inline">
      <li>${proj.publishedAt}</li>
      <li>Used : ${proj.labels}</li>
    </ul>
    <a href="${proj.url}"> Click here to check out this project </a>
    <br>
    <button class="btn btn-primary" data-dismiss="modal" type="button">
        <i class="fa fa-times"></i>
        Close Project</button>
    `;
  var elModal = document.querySelector('.modal-body');
  elModal.innerHTML = strHtml;
}

function onContact() {
    var mail = $('.mail-contact').val();
    var sbj = $('.sbj-contact').val();
    var msg = $('.msg-contact').val();
    var str = `https://mail.google.com/mail/?view=cm&fs=1&to=${mail}&su=${sbj}&body=${msg}`;
    window.open(str);
}   