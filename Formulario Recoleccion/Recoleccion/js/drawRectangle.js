var imageObj = null;
var FlagInicial = 0;
var canvasOffset1 = {};
var canvasOffset2 = {};
var offsetX = null;
var offsetY = null;
function dibujarCuadros() {

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = $('#picture').width();
    ctx.canvas.height = $('#picture').height();
    var rect = {};
    var rect2 = {};
    var drag = false;
    var rotateflag = true;
    var degree = 0;
    var $canvas2 = $("#myCanvas");
    canvasOffset1 = $canvas2.offset();
    let el = document.getElementById('myCanvas');
    canvasOffset2 = offset(el);
    if (canvasOffset2.left >= canvasOffset1.left) {
        offsetX = canvasOffset2.left;
        offsetY = canvasOffset2.top;
    }
    else {
        offsetX = canvasOffset1.left;
        offsetY = canvasOffset1.top;
    }
    var imgFuente = document.getElementById('picture').getAttribute('src');

    function init() {
        canvas.addEventListener("touchstart", mouseDown, false);
        canvas.addEventListener("touchend", mouseUp, false);
        canvas.addEventListener("touchmove", mouseMove, false);
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mousemove', mouseMove, false);
    }

    function mouseDown(e) {
        e.preventDefault();
        imgFuente = document.getElementById('picture').getAttribute('src');
        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var evth = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
            var eth = evth.touches[0] || evth.changedTouches[0];
            rect.startX = eth.pageX - offsetX;
            rect.startY = eth.pageY - offsetY;
            rect2.startX = eth.pageX;
            rect2.startY = eth.pageY;
        } else {
            rect.startX = e.pageX - offsetX;
            rect.startY = e.pageY - offsetY;
            rect2.startX = e.pageX;
            rect2.startY = e.pageY;
        }

        drag = true;
    }

    function mouseUp(e) {
        e.preventDefault();
        let xD = 0;
        let yD = 0;
        let wD = 0;
        let hD = 0;
        if (rect.w < 0) {
            xD = rect.startX + rect.w;
            wD = rect.w * -1;

        } else {
            xD = rect.startX;
            wD = rect.w;
        }
        if (rect.h < 0) {
            yD = rect.startY + rect.h;
            hD = (rect.h * -1);
        } else {
            yD = rect.startY
            hD = rect.h;
        }
        $(".face-CanvaManual").remove();
        $('<canvas>', {
            'class': 'face-CanvaManual',
            'id': 'canv_' + 10000,
            'onclick': 'printNAME(event)',
            'ondblclick':'DBCLK(event)',
            'css': {
                'position': 'relative',
                'width': wD + 'px',
                'height': hD + 'px'
            },
            'data-file': ((IMGcargada == null) ? 'images/FD4.jpg' : IMGcargada),
            'data-box': 'null',
            'data-manual': '1',
            'data-info': 'nada'
        }).insertBefore('#Saltousar');
        $('#canv_10000').css('border', '3px solid #950303')
        cropImg(imgFuente, 10000, xD, yD, wD, hD);
        drag = false;
    }

    function mouseMove(e) {
        e.preventDefault();
        if (drag) {

            if (rotateflag) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
            }
            else {
                drawRotated(degree);
            }
            if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                var evth = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
                var eth = evth.touches[0] || evth.changedTouches[0];
                rect.w = (eth.pageX - offsetX) - rect.startX;
                rect.h = (eth.pageY - offsetY) - rect.startY;
            } else {
                rect.w = (e.pageX - offsetX) - rect.startX;
                rect.h = (e.pageY - offsetY) - rect.startY;
            }
            ctx.strokeStyle = 'red';
            ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);

        }
    }
    if (FlagInicial == 0) {
        init();
        FlagInicial = 1;
    }
    imageObj = new Image();
    if (IMGcargada == null) {
        imageObj.src = 'images/FD4.jpg';
    } else {
        imageObj.src = IMGcargada;
    }
    imageObj.onload = function () { ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height); };
}