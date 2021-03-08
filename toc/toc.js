var toc = document.getElementById('toc');
var header = document.getElementById('header');
var config = q2o(window.location.search);
if (window.location.search) {
  var url = config.url;
  var firstnumber = config.fnum;
  var secondnumber = config.snum;
  var heading = config.heading;
  var title = config.title;
  var headingtitle = title.replace(/\+/g, ' ');
  var tanyatitle = title.replace(/\%3F/g, '');
  var striptitle = tanyatitle.replace(/\+/g, '-');
  var lowertitle = striptitle.toLowerCase();
  var tocresult = '<li id="from:' + firstnumber + '.' + secondnumber + '"><a href="' + url + '#to:' + lowertitle + '">' + headingtitle + '</a> <span class="a:t-o-c"></span></li>';
  var headerresult = '<h2 class="is:t-o-c" id="to:' + lowertitle + '">' + headingtitle + '<a class="a:t-o-c" href="' + url + '#from:' + firstnumber + '.' + secondnumber + '"></a></h2>';
  toc.innerText = tocresult;
  header.innerText = headerresult;
}