var toc = document.getElementById('img');
var config = q2o(window.location.search);
if (window.location.search) {
  var url = config.url;
  var googleurl = url.replace(/1.bp.blogspot.com/g, 'lh4.googleusercontent.com');
  var title = config.title;
  var imgtitle = title.replace(/\+/g, ' ');
  var alt = config.alt;
  var imgalt = alt.replace(/\+/g, ' ');
  var caption = config.caption;
  var imgcaption = caption.replace(/\+/g, ' ');
  var imageresult = '<figure><img src="' + googleurl + '" title="' + imgtitle + '" alt="' + imgalt + '" /><figcaption>' + imgcaption + '</figcaption></figure>';
  img.innerText = imageresult;
}