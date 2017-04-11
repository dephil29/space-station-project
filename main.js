if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();
}

var canvas = document.getElementById('scene');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var space = new Image();
space.src = "space.jpg";
var earth = new Image();
earth.src = "earth.png";
var satellite = new Image();
satellite.src = "satellite.jpg";


var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
}
function getData() {
    $.ajax({
        url: "http://api.open-notify.org/astros.json",
        success: function(res) {
            // console.log(res);
            document.querySelector(".craft").innerHTML = res.people[0].craft;
            res['people'].forEach(function(res) {
                $('.names').append('<li>' + res['name'] + '</li>');
            });
        }
    })
}
getData();




var i = 0;
var redraw = function() {


    ctx.save();



    // paint bg
    // ctx.fillStyle = "space";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(space, 0, 0, 1335, 581)


    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    // circle('yellow', 20);
    ctx.drawImage(earth, -60, -60);


    // rotate + move along x
    ctx.rotate(i / 100);
    ctx.translate(100, 0);

    // draw planet
    // circle('green', 10);
    ctx.drawImage(satellite, -35, -35);

    ctx.restore();

    i++;

    window.requestAnimationFrame(redraw);
};

window.requestAnimationFrame(redraw);
