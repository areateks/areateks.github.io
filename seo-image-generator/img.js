var toc = document.getElementById('img');
var config = q2o(window.location.search);
if (window.location.search) {
  var url = config.url;
  var googleurl = url.replace(/1.bp.blogspot.com/g, 'lh4.googleusercontent.com');
  var title = config.title;
  var alt = alt.title;
  var title = config.title;
  var caption = caption.title;
  var imageresult = '<figure><img src="' + googleurl + '" title="' + title + '" alt="' + alt + '" /><figcaption>' + caption + '</figcaption></figure>';
  img.innerText = imageresult;
}