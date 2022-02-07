console.log('Starting up the projet gallery');

function onInit() {
    renderProjs()
}

function renderProjs() {
    var strHtml = `
 <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${'TODO Page'}</h4>
      <p class="text-muted">Illustration</p>
    </div>
  </div> 
  `
    $('.proj-list').html(strHtml)
}