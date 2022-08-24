var images;
var size= {};

$(document).ready(function(){
  $("body").append('<div id="gallery"></div>');

    $.ajax({
      'async': false,
      'global': false,
      'url': "/image-collection.json",
      'dataType': "json",
      'success': function(data) {
        images = data.images;
        size = {
          width: data.size.substring(0, data.size.indexOf("x")),
          height: data.size.substring(data.size.indexOf("x")+1)
        };
      }
    });
  $("#gallery").css("max-width", 2*size.width + 20);
  
  appendInitialItem(images);
  for(let i = 0; i < 4; i++){
    images.shift();
  }
  if($(window).scrollTop() + $(window).height() >= $(document).height()) {
    appendNewItem(images);
  }
})

function onClick(e){
  var link = $(e).data("link");
  if(link !== ""){
    window.open(link, "_blank");
  }
}

function appendInitialItem(items){
  
  if(Array.isArray(items)){
    for(let i = 0; i < 4; i ++){
      var imageSrc = images[i].src;
      var imageText = images[i].text != null ? images[i].text: '';
      var imageLink = images[i].link != null ? images[i].link: '';
      var imageHTML = `<div class="gallery-item-wrapper" style='width:${size.width}px'>` +
      `<div class="gallery-img" style='width:${size.width}px; height:${size.height}px'>` +
      `<img style='max-width:${size.width}px' src=${imageSrc} data-link=${imageLink} onclick='onClick(this)' ></div>`+
      `<div class="gallery-img-title" style='width:${size.width}px'>${imageText}</div>`;
      $("#gallery").append(imageHTML);
    }
  }
}

function appendNewItem(items){
  
  if(Array.isArray(items)){
    var firstImageSrc = items[0].src;
    var firstImageText = items[0].text != null ?items[0].text : '';
    var firstImageLink = images[0].link != null ? images[0].link: '';

    var secondImageSrc = items[1].src;
    var secondImageText = items[1].text != null ?items[1].text : '' ;
    var secondImageLink = images[1].link != null ? images[1].link: '';
    
    var firstImageHTML = `<div class="gallery-item-wrapper" style='width:${size.width}px'>` +
    `<div class="gallery-img" style='width:${size.width}px; height:${size.height}px'>` +
    `<img style='max-width:${size.width}px' src=${firstImageSrc} data-link=${firstImageLink} onclick='onClick()'></div>`+
    `<div class="gallery-img-title" style='width:${size.width}px'>${firstImageText}</div>`;

    var secondImageHTML = `<div class="gallery-item-wrapper" style='width:${size.width}px'>` +
    `<div class="gallery-img" style='width:${size.width}px; height:${size.height}px'>` +
    `<img style='max-width:${size.width}px' src=${secondImageSrc} data-link=${secondImageLink} onclick='onClick()'></div>`+
    `<div class="gallery-img-title" style='max-width:${size.width}px'>${secondImageText}</div>`;

    items.shift();
    items.shift();
    $("#gallery").append(firstImageHTML);
    $("#gallery").append(secondImageHTML); 
  }
}

$(window).scroll(function(e) {
  if(images.length == 0){
    return;
  }
  if(Math.round($(window).scrollTop() + $(window).height()) >= $(document).height()) {
    appendNewItem(images)
  }
});