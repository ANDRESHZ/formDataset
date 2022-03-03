var nombreUsar = "sss";
var srcdrop = null;
var IMGcargada = null;
var ManualAuto = 0;
var imgRecortada = 0;
var idCANVASBB = 'nullssss';

function padIZQ(str, max) {
    str = str.toString();
    return str.length < max ? padIZQ("0" + str, max) : str;
}

function printNAME(e) {
    $('.face-Canvas2').attr('class', 'face-Canvas');
    $('.face-Canvas').css('border', 'none');
    $('#' + e.target.id).css('border', '3px solid #950303');
    $('#' + e.target.id).attr('class', 'face-Canvas2');
    $("#usar-btn").css({ 'visibility': 'visible', 'display': "block" });
    idCANVASBB = $('.face-Canvas2').attr('id');
}
function SelectCorte(e) {
    try {
        $('#' + e.target.id).attr('ondblclick', ' ');
    } catch (error) {
        console.log(error);
    }
    if ($('#' + e.target.id).attr('class') == "face-CanvasData") {
        let idi = $(".face-CanvasData2").eq(0).attr('id');
        let Datos = saveData();
        if (Datos != null) {
            $("#" + idi).attr('data-info', Datos.toString());
        }
        $(".face-CanvasData2").attr('class', 'face-CanvasData');
        $('.face-CanvasData').css('border', 'none');
        $('#' + e.target.id).css('border', '3px solid #950303');
        $('#' + e.target.id).attr('class', 'face-CanvasData2');
        LoadDataCanvas(e.target.id.substring(e.target.id.indexOf("_") + 1));
    } else {
        $('.face-CanvasC2').attr('class', 'face-CanvasC');
        $('.face-CanvasC').css('border', 'none');
        $('#' + e.target.id).css('border', '3px solid #950303')
        $('#' + e.target.id).attr('class', 'face-CanvasC2')
        $("#eliminar-btn").css({ 'visibility': 'visible', 'display': "block" });
    }
}
function offset(el) {
    var rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop; return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function cropImg(scrs, ids, L, T, W, H) {
    const canvas = document.getElementById('canv_' + ids.toString());
    const ctx = canvas.getContext('2d');
    const canvas2 = document.getElementById('myCanvas');
    const ctx2 = canvas2.getContext('2d');
    var image = new Image();
    image.src = scrs;
    image.onload = function () {
        let W2 = 0.0;
        let H2 = 0.0;
        let L2 = 0.0;
        let T2 = 0.0;
        if (ids > 9999) {
            let heightI = image.height;
            let widthI = image.width;
            console.log({ widthI, heightI, CanvW: ctx2.canvas.width, CanH: ctx2.canvas.height, TPropW: (widthI / ctx2.canvas.width), PropH: (heightI / ctx2.canvas.height) });
            W2 = W * (widthI / ctx2.canvas.width);
            H2 = H * (heightI / ctx2.canvas.height);
            L2 = L * (widthI / ctx2.canvas.width);
            T2 = T * (heightI / ctx2.canvas.height);
            // console.log({ W2, W, H2, H, L2, L, T2, T });
            $("#usar-btn").css({ 'visibility': 'visible', 'display': "block" });
        }
        else {
            W2 = W;
            H2 = H;
            L2 = L;
            T2 = T;
        }
        let infoFILES = $("#canv_" + ids.toString()).data('file');
        infoFILES = infoFILES.substring(infoFILES.indexOf("/") + 1);
        $("#canv_" + ids.toString()).attr('data-box', [L2, T2, W2, H2].toString());
        $("#canv_" + ids.toString()).attr('title', infoFILES.substring(infoFILES.indexOf("_") + 1));
        ctx.drawImage(image, L2, T2, W2, H2, 0, 0, canvas.width, canvas.height);
    }
}
function clearPRos() {
    $(".face-box").remove();
    $(".face-Canvas").remove();
    $(".face-Canvas2").remove();
    $(".face-CanvaManual").remove();
}

$("#manual-btn").click(function () {
    ManualAuto = 1;
    $('#AutoDetect').css({ 'visibility': 'hidden', 'display': 'none' });
    $("#ManualDetect").css({ 'visibility': 'visible', 'display': 'inline' });
    clearPRos();
    dibujarCuadros();
    ResizeCanvasPrint();
    $("#usar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
});

$("#auto-btn").click(function () {
    ManualAuto = 0;
    clearPRos();
    $('#AutoDetect').css({ 'visibility': 'visible', 'display': 'inline' });
    $("#ManualDetect").css({ 'visibility': 'hidden', 'display': 'none' });
    $("#usar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
});
function DBCLK(e) {
    try {
        if (e.target.id != "usar-btn") {
            $('#' + e.target.id).attr('ondblclick', ' ');
        } else{
            $('.face-Canvas2').attr('ondblclick', ' ');
            $('.face-CanvaManual').attr('ondblclick', ' ');
        }
    } catch (error) {
        console.log(error);
    }
    imgRecortada = imgRecortada + 1;
    $(".face-CanvaManual").attr('id', 'canvCorte_' + imgRecortada.toString());
    $(".face-CanvaManual").attr('class', 'face-CanvasC');
    $(".face-Canvas2").attr('id', 'canvCorte_' + imgRecortada.toString());
    $(".face-Canvas2").attr('class', 'face-CanvasC');
    $(".face-CanvasC").attr('onclick', 'SelectCorte(event)');
    $('#canvCorte_' + imgRecortada.toString()).detach().prependTo('#UsoRostros');
    $(".face-Canvas").remove();
    $(".face-Cavas2").remove();
    $('.face-CanvasC').css('border', 'none');
    $("#usar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
    $("#eliminar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
    if (imgRecortada >= 2) {
        $("#FIN-btn").css({ 'visibility': 'visible', 'display': 'block' });
    }
    
}

$("#eliminar-btn").click(function () {
    $('.face-CanvasC2').remove();
    $('.face-CanvasC').css('border', 'none');
    $("#eliminar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
    for (var i = $('.face-CanvasC').length - 1; i >= 0; i--) {
        $('.face-CanvasC').eq(i).attr('id', 'canvCorte_' + ($('.face-CanvasC').length - i).toString());
    }
    imgRecortada = imgRecortada - 1;
    if (imgRecortada <= 1) {
        $("#FIN-btn").css({ 'visibility': 'hidden', 'display': 'none' });
    }
});

$("#start-btn").click(function () {
    $("#usar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
    if (IMGcargada == null) {
        alert('No pudes usar la imagen de referencia (debes cargar una propia)');
    } else {
        let imgFuente = document.getElementById('picture').getAttribute('src');
        $("#manual-btn").css({ 'visibility': 'visible', 'display': 'inline' });
        $('#picture').faceDetection({
            complete: function (faces) {
                $('#pManual').css({ 'visibility': 'visible', 'display': 'inline' });
                console.log(faces);
                clearPRos();
                let el = document.getElementById('picture');
                let rect = offset(el);
                let _x = rect.left;
                let _y = rect.top;
                if (faces.length == 0) {
                    $("#usar-btn").css({ 'visibility': 'hidden', 'display': 'none' });
                }
                for (var i = faces.length - 1; i >= 0; i--) {
                    let xLeft = (faces[i].x + (_x)) * faces[i].scaleX + 8;
                    let yTop = (faces[i].y + (_y)) * faces[i].scaleY + 12;
                    let xLeft2 = (faces[i].x - 8) //* faces[i].scaleX;
                    let yTop2 = (faces[i].y - 12) //* faces[i].scaleY;
                    let dWidth = (faces[i].width + 20) * faces[i].scaleX;
                    let aHeight = (faces[i].height + 30) * faces[i].scaleY;
                    let dWidth2 = (faces[i].width + 20);
                    let aHeight2 = (faces[i].height + 30);
                    $('<canvas>', {
                        'class': 'face-Canvas',
                        'id': 'canv_' + i.toString(),
                        'onclick': 'printNAME(event)',
                        'ondblclick': 'DBCLK(event)',
                        'css': {
                            'position': 'relative',
                            'width': dWidth + 'px',
                            'height': aHeight + 'px'
                        },
                        'data-file': ((IMGcargada == null) ? 'images/FD4.jpg' : IMGcargada),
                        'data-box': 'null',
                        'data-manual': '0',
                        'data-info': 'nada'
                    }).insertAfter(this);
                    cropImg(imgFuente, i, xLeft2, yTop2, dWidth2, aHeight2);
                }
            },
            error: function (code, message) {
                alert('Error: ' + message);
            }
        })
        $('.face-Canvas').detach().prependTo('#CarasAqui');
    }
});

$("#FIN-btn").click(function () {
    $('.Adicionales').css({ 'visibility': 'visible', 'display': 'block' });
    $(".face-CanvasC2").attr('class', 'face-CanvasData');
    $(".face-CanvasC").attr('class', 'face-CanvasData');
    $('.face-CanvasData').css('border', 'none');
    let pass = $('.face-CanvasData');
    for (var i = 0; i <= pass.length - 1; i++) {
        pass.eq(i).detach().prependTo('#UsoRostros2');
    }
    $('.RecortarSubir').css({ 'visibility': 'hidden', 'display': 'none' });
    $("#canvCorte_1").css('border', '3px solid #950303');
    $("#canvCorte_1").attr('class', 'face-CanvasData2');
    LoadDataCanvas(1);
});

$("#VolverREC-btn").click(function () {
    $('.RecortarSubir').css({ 'visibility': 'visible', 'display': 'block' });
    let idi = $(".face-CanvasData2").eq(0).attr('id');
    let Datos = saveData();
    if (Datos != null) {
        $("#" + idi).attr('data-info', Datos.toString());
    }
    $(".face-CanvasData2").attr('class', 'face-CanvasData');
    $('.face-CanvasData').css('border', 'none');
    let pass = $('.face-CanvasData');
    for (var i = 0; i <= pass.length - 1; i++) {
        pass.eq(i).detach().prependTo('#UsoRostros');
    }
    // $('.face-CanvasData').detach().prependTo('#UsoRostros');
    $(".face-CanvasData").attr('class', 'face-CanvasC');
    $('.Adicionales').css({ 'visibility': 'hidden', 'display': 'none' });
});

//SUBIR DATOS
$('#SubirData-btn').click(function () {

});

// DRAG AND DROP

function cambiarSCR(nombre) {
    $('#picture').attr('src', nombre);
    var canvas2 = document.getElementById('myCanvas');
    var ctx2 = canvas2.getContext('2d');
    imageObj = new Image();
    imageObj.src = nombre;
    imageObj.onload = function () { ctx2.drawImage(imageObj, 0, 0, canvas2.width, canvas2.height); };
    console.log(`:::> ${nombre}`);
}
// eliminar fondo
function get_average_rgb(img) {
    var context = document.createElement('canvas').getContext('2d');
    if (typeof img == 'string') {
        var src = img;
        img = new Image;
        img.setAttribute('crossOrigin', '');
        img.src = src;
    }
    context.imageSmoothingEnabled = true;
    context.drawImage(img, 0, 0, 1, 1);
    return context.getImageData(1, 1, 1, 1).data.slice(0, 3);
}
// arreglar cnavas de recortes
function ResizeCanvasPrint() {
    $('#AutoDetect').css({ 'visibility': 'visible', 'display': 'inline' });
    $("#ManualDetect").css({ 'visibility': 'visible', 'display': 'inline' });
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = $('#picture').width();
    ctx.canvas.height = $('#picture').height();
    if (IMGcargada == null) {
        imageObj = new Image();
        imageObj.src = 'images/FD4.jpg';
        imageObj.onload = function () { ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height); };
    } else {
        cambiarSCR(IMGcargada);
    }
    if (ManualAuto == 1) {
        $('#AutoDetect').css({ 'visibility': 'hidden', 'display': 'none' });
        $("#ManualDetect").css({ 'visibility': 'visible', 'display': 'inline' });
    }
    else {
        $("#ManualDetect").css({ 'visibility': 'hidden', 'display': 'none' });
    }
}

window.onresize = function (event) {
    var $canvas2 = $("#myCanvas");
    let el = document.getElementById('myCanvas');
    canvasOffset1 = $canvas2.offset();
    canvasOffset2 = offset(el);
    if (canvasOffset2.left >= canvasOffset1.left) {
        offsetX = canvasOffset2.left;
        offsetY = canvasOffset2.top;
    }
    else {
        offsetX = canvasOffset1.left;
        offsetY = canvasOffset1.top;
    }
    clearPRos();
    ResizeCanvasPrint();
};
datafrom = JSON.parse(sessionStorage.getItem("datafrom"));
console.log(datafrom);

function saveData() {
    let MM = padIZQ($("#element_1_2").val(), 2);
    let YYYY = padIZQ($("#element_1_3").val(), 4);
    try {
        if (parseInt(MM) <= 0 || parseInt(MM) > 12 || parseInt(YYYY) <= 1910 || parseInt(YYYY) > 2026) {
            let idi = $(".face-CanvasData2").eq(0).attr('id');
            if ($("#" + idi).attr('data-info') != "nada") {
                alert("Fecha mal Escrita o fuera de rango " + MM + "|" + YYYY);
            }
        }
        else {
            let Cabello = $("#element_2").val();
            let Gafas = $("#element_3").val();
            let mirar = $('input[name="mirar"]:checked').val();
            mirar = mirar == undefined ? 'nada' : mirar;
            let Color_BN = $('input[name="Color_BN"]:checked').val();
            Color_BN = Color_BN == undefined ? 'nada' : Color_BN;
            let EdadAparente = $("#element_6").val();
            let Bello = $("#element_7_1").val();
            let chs = "";
            var chvals = [];
            $('input[name="CxAcci"]').each(function () {
                chvals.push($(this).prop('checked'));
            });
            chs = chvals.toString();
            let datos = [MM, YYYY, Cabello, Gafas, mirar, Color_BN, EdadAparente, Bello, chs];
            return datos;
        }
    }
    catch (err) {
        alert('Algun datos esta mal puesto:\n    ' + err.message);
    }
    return null;
}

function LoadDataCanvas(indice) {
    let Info = $("#canvCorte_" + indice.toString()).attr('data-info');
    if (Info == "nada") {
        $("#element_1_2").val('');
        $("#element_1_3").val('');
        $("#element_2").val('1');
        $("#element_3").val('1');
        $('input[name="mirar"]').each(function () {
            $(this).prop('checked', false);
        });
        $('input[name="Color_BN"]').each(function () {
            $(this).prop('checked', false);
        });
        $("#txtmira").text("");
        $("#element_6").val("1");
        $("#element_7_1").val("1");
        $('input[name="CxAcci"]').each(function () {
            $(this).prop('checked', false);
        });
    } else {
        Info = Info.split(",");
        $("#element_1_2").val(Info[0]);
        $("#element_1_3").val(Info[1]);
        $("#element_2").val(Info[2]);
        $("#element_3").val(Info[3]);
        if (Info[4] == "nada") {
            $('input[name="mirar"]').each(function () {
                $(this).prop('checked', false);
            });
            $("#txtmira").text("");
        } else {
            $('input[value="' + Info[4] + '"]').prop('checked', true);
            $("#txtmira").text(Info[4]);
        }
        if (Info[5] == "nada") {
            $('input[name="Color_BN"]').each(function () {
                $(this).prop('checked', false);
            });
        } else {
            $('input[value="' + Info[5] + '"]').prop('checked', true);
        }
        $("#element_6").val(Info[6]);
        $("#element_7_1").val(Info[7]);
        let auxi = 8;
        $('input[name="CxAcci"]').each(function () {
            $(this).prop('checked', Info[auxi] == 'true');
            auxi = auxi + 1;
        });
    }
}

$('input[type=radio][name=mirar]').change(function () {
    // console.log(this);
    $("#txtmira").text($('input[type=radio][name=mirar]:checked').val());
});


