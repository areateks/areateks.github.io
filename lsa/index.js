//Monkey Raptor: Checking Firefox June 27, 2015
var firefox = navigator.userAgent.match(/firefox/gi);
//Monkey Raptor: Added scroll locking module June 25, 2015
var lockScroll = function(a, b) {
  "use strict";
  if (firefox) {
    return;
  }
  var d = document,
    w = window,
    ta = function(z) {
      return Array.prototype.slice.call(d.querySelectorAll(z));
    },
    elm, current_position, w_height, e_height, doDefault = function() {
      ta("html")[0].scrollTop = w.scrollY;
      d.body.scrollTop = w.scrollY;
    },
    gh = function(z) {
      return parseInt(w.getComputedStyle(z, null).getPropertyValue("height"), 10);
    };
  elm = ta(a);
  elm.forEach(function(v) {
    v.onmouseover = function() {
      if (b !== "cancel") {
        w_height = w.innerHeight;
        e_height = gh(v);
        current_position = w.scrollY;
        w.onscroll = function() {
          if ((e_height < v.scrollHeight) && (e_height < w_height) && (w.scrollY !== current_position)) {
            ta("html")[0].scrollTop = current_position;
            d.body.scrollTop = current_position;
          }
        };
      } else {
        w.onscroll = doDefault;
      }
    };
    v.onmouseout = function() {
      w.onscroll = doDefault;
    };
  });
};

//Monkey Raptor: Updated June 13, 2015
var d = document,
  gid = function(z) {
    "use strict";
    return d.getElementById(z);
  },
  b_c = gid("btn_char"),
  b_w = gid("btn_word"),
  b_cl = gid("btn_clear"),
  inp = gid("input_text"),
  outa = gid("out_arr"),
  out = gid("output_text"),
  li = gid("list"),
  elps = gid("elapsed"),
  divider = encodeURIComponent("<|>"),
  occurrence = function(array) {
    "use strict";
    var result = {};
    if (array instanceof Array) {
      array.forEach(function(v, i) {
        if (!result[v]) {
          result[v] = [i];
        } else {
          try {
            result[v].push(i);
          } catch (e) {
            if (e) {
              return;
            }
          }
        }
      });
    }
    return result;
  },
  dat = function() {
    "use strict";
    var date = new Date(),
      ms = date.getTime();
    return ms;
  },
  start, finish, elapsed, timmy, flag;

function cscrollbtm() {
  "use strict";
  var toptit = $(b_c).offset().top;
  $("html, body").animate({
    scrollTop: toptit
  }, 300, function() {
    lockScroll("#out_arr");
  });
  if (timmy) {
    window.clearTimeout(timmy);
  }
}

function cscrolltop() {
  "use strict";
  var toptit = $("#input_text").offset().top;
  lockScroll("#out_arr", "cancel");
  $("html, body").animate({
    scrollTop: toptit
  }, 300);
}

function cCheck(w) {
  "use strict";
  if (w.value.length > 0) {
    b_cl.disabled = 0;
    b_c.disabled = 0;
    b_w.disabled = 0;
  } else {
    b_cl.disabled = 1;
    b_c.disabled = 1;
    b_w.disabled = 1;
  }
}

function cClear() {
  "use strict";
  inp.value = "";
  out.value = "";
  elps.value = "";
  li.innerHTML = "";
  b_cl.disabled = 1;
  b_c.disabled = 1;
  b_w.disabled = 1;
  cscrolltop();
  lockScroll("#out_arr", "cancel");
}

function iClear() {
  "use strict";
  out.value = "";
  elps.value = "";
  li.innerHTML = "";
  lockScroll("#out_arr", "cancel");
}
inp.onclick = function() {
  "use strict";
  iClear();
  cscrolltop();
};
inp.onfocus = iClear;
b_cl.onclick = cClear;

function sortnumber(a, b) {
  "use strict";
  return parseInt(b, 10) - parseInt(a, 10);
}

function convert(elm) {
  "use strict";
  return elm.split(divider);
}

function printR(a) {
  "use strict";
  var output_left, output_right, out_buff = [];
  a.forEach(function(v) {
    if (convert(v)[1] === " ") {
      output_left = "<span style='color:brown'>white space</span>";
    } else if (convert(v)[1] === "-") {
      output_left = "<span style='color:red'>single dash</span>";
    } else if (convert(v)[1] === "-{2,}") {
      output_left = "<span style='color:crimson'>multiple dashes</span>";
    } else if (convert(v)[1] === "_") {
      output_left = "<span style='color:purple'>single underscore</span>";
    } else if (convert(v)[1] === "_{2,}") {
      output_left = "<span style='color:darkmagenta'>multiple underscores</span>";
    } else {
      output_left = convert(v)[1];
    }
    output_right = convert(v)[0];
    out_buff.push("<li><a href='https://kbbi.kemdikbud.go.id/entri/" + output_left + "' target='_blank'>" + output_left + "</a> <span style='color:royalblue'>(" +
      output_right + ")</span></li>");
  });
  li.innerHTML += out_buff.join("");
  if (li.innerHTML.length) {
    timmy = window.setTimeout(cscrollbtm, 100);
  }
}

function worda() {
  "use strict";
  var buff, array = [],
    total;
  start = dat();
  if (inp.value !== "") {
    buff = inp.value.replace(/[^\-\w]+/g, " ").replace(/-{2,}/g, " -{2,} ").replace(/_{2,}/g, " _{2,} ").split(/\s/g);
    buff.forEach(function(v, i) {
      if (v === "") {
        buff.splice(i, 1);
      }
    });
    total = buff.length;
    buff = occurrence(buff);
    Object.keys(buff).forEach(function(v) {
      array.push(buff[v].length + divider + v);
    });
    array = array.sort(sortnumber);
    printR(array);
    li.innerHTML += "<hr>Total: <span style='color:royalblue'>" +
      total + "</span>";
    out.value = total;
    finish = dat();
    elapsed = finish - start;
    elps.value = elapsed + " ms";
  }
}

function chara() {
  "use strict";
  var buff, array = [],
    total;
  start = dat();
  if (inp.value !== "") {
    buff = inp.value.split("");
    total = buff.length;
    buff = occurrence(buff);
    Object.keys(buff).forEach(function(v) {
      array.push(buff[v].length + divider + v);
    });
    array = array.sort(sortnumber);
    printR(array);
    out.value = total;
    li.innerHTML += "<hr>Total: <span style='color:royalblue'>" + total + "</span>";
    finish = dat();
    elapsed = finish - start;
    elps.value = elapsed + " ms";
  }
}

function the_thing(flag) {
  "use strict";
  li.innerHTML = "";
  return !flag ? chara() : worda();
}
b_c.onclick = function() {
  "use strict";
  flag = 0;
  the_thing(flag);
};
b_w.onclick = function() {
  "use strict";
  flag = 1;
  the_thing(flag);
};