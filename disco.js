// the source code behind the bookmarklet on danceparty.biz
// minify it, slap it into an anchor tag, and you're a click away from a dance party on you website

(function(){
  // add mirror ball transition CSS
  var css = '#discoball { -webkit-transition: all 2.5s ease-in-out; -moz-transition: all 2.5s ease-in-out; -ms-transition: all 2.5s ease-in-out; -o-transition: all 2.5s ease-in-out; transition: all 2.5s ease-in-out; position: fixed; top: -200px; left: 50%; width: 160px; z-index: 999; margin-left: -80px;}',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  // add mirror ball to document
  var discoBall = document.createElement('img');
  discoBall.src = 'http://lonelydads.com/disco/ball.gif';
  discoBall.id = 'discoball';
  document.body.appendChild(discoBall);

  // lower ball after .01 sec
  var lowerBall = window.setTimeout(function () {
    document.querySelector('#discoball').style.top = '-20px';
  }, 10);

  // start music and colors after 2.7 sec
  var beginParty = window.setTimeout(function () {
    // add music
    var music = document.createElement('audio');
    music.loop = true;
    music.src = 'http://lonelydads.com/disco/hotshot.mp3';
    music.autoplay = true;
    music.id = 'hotshot';
    document.body.appendChild(music);
    document.querySelector('#hotshot').play();

    function randomColor() {
      var hex = '#';
      for (var i = 0; i<6; i++) {
        hex += getHexBit().toString();
      }
      return hex;
    }

    function getHexBit() {
      var val = Math.floor(Math.random()*16),
          alpha = ['a', 'b', 'c', 'd', 'e', 'f'];
      if (val > 9)  val = alpha[val - 10];
      return val;
    }

    // for everything but the disco ball, randomize background color and text color every .13 sec
    var elements = document.querySelectorAll('*:not(#discoball)');
    var intervalID = window.setInterval(function () {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = randomColor();
        elements[i].style.color = randomColor();
      };
    }, 130);

  }, 2700);
})();