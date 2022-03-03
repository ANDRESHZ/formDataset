var myDate = new Date();
var thisMonth = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
console.log("Formatted date start: " + formatDate(thisMonth));

async function sleep(ms) {
    return (await (new Promise(resolve => setTimeout(resolve, ms))));
}

function padLeft(n) {
    return ("00" + n).slice(-2);
}
function formatDate() {
    var bfecha = document.getElementById('fecha1');
    var d = new Date,
        dformat = [padLeft(d.getDate()),
        padLeft(d.getMonth() + 1),
        d.getFullYear()
        ].join('/');
    bfecha.textContent = dformat
    return dformat
}
function diff_years(strdate1, strdate2) {
    var fecha1 = strdate1.split('/');
    dt1 = new Date(fecha1[2], fecha1[1], fecha1[0]);
    fecha2 = strdate2.split('/');
    dt2 = new Date(fecha2[2], fecha2[1], fecha2[0]);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.floor(Math.abs(diff / 365.25));
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
var datafrom = new FormData();

function logSubmit(event) {
    datafrom = new FormData();
    datafrom.append("name", document.getElementById("element_1").value);
    datafrom.append("email", document.getElementById("element_3").value);
    datafrom.append("sex", document.getElementById("element_5").value);
    datafrom.append("phone", document.getElementById("element_6").value);
    if (validateEmail(datafrom.get('email'))) {
        const valR = /\+/;
        if (valR.test(datafrom.get('phone')) || datafrom.get('phone') == "" || datafrom.get('phone') == null) {
            datafrom.append("date", `${document.getElementById("element_4_1").value}/${document.getElementById("element_4_2").value}/${document.getElementById("element_4_3").value}`);
            var edad = diff_years(formatDate(thisMonth), datafrom.get('date'));
            datafrom.append('age', edad);
            if (edad >= 18) {
                var ifConnected = window.navigator.onLine;
                if (ifConnected) {
                    var v = grecaptcha.getResponse();
                    if (v.length == 0) {
                        document.getElementById('captcha').innerHTML = "No puede dejar vacio el capcha";
                    }
                    else {
                        document.getElementById('captcha').innerHTML = "Captcha completed";
                        alert('Connection available');
                        let aaa = modifyPdf();
                        let Colab = document.querySelector('input[name="new_old"]:checked').value;
                        let DateColab = document.getElementById("element_8_2").value + document.getElementById("element_8_3").value;
                        console.log([Colab, DateColab])
                        if (Colab == "Si" || DateColab == "" || DateColab == "00" || DateColab == "000" || DateColab == "0000" || DateColab == "00000") {
                            DateColab = (formatDate(thisMonth).substring(formatDate(thisMonth).indexOf("/"))).replace(/\//g,"");
                        }
                        loga.textContent = `datos: ${datafrom.get('name')}|${datafrom.get('sex')}|${datafrom.get('date')} (${datafrom.get('age')})|${datafrom.get('email')}|${datafrom.get('phone')}|${Colab}|${DateColab}`;
                        sessionStorage.setItem("datafrom", JSON.stringify([datafrom.get('name'), datafrom.get('email'), datafrom.get('sex'), datafrom.get('phone'), datafrom.get('date'), datafrom.get('age'), formatDate(thisMonth), Colab, DateColab]));
                        setTimeout(() => { console.log("World!"); }, 2000);
                        setTimeout(() => { console.log("World!"); }, 1000);
                        setTimeout(() => { console.log("World!"); }, 1000);
                        setTimeout(() => { window.location.href = "FaceDetec.html"; }, 5000);
                    }
                } else {
                    alert('Conexión a internet restringida o sin conexion');
                    loga.textContent = `Sin conexión a internet intente mas tarde: ${event.timeStamp}`;
                }
            } else {
                console.log(`(${edad} años) No es mayor de edad, así que no puede firmar el consentimiento informado (Recuerda que cambiar de fecha no te exime de problemas legales por falsedad en documento).`);
                alert(`(${edad} años) No es mayor de edad, así que no puede firmar el consentimiento informado (Recuerda que cambiar de fecha no te exime de problemas legales por falsedad en documento).`);
            }


        } else {
            alert('Su número télefonico debe incluir el indicativo del pais EJ: +57321532000');
            console.log(`su número debe incluir el indicativo del pais el actual: ${datafrom.get('phone')}`)
        }

    } else {
        alert('Ajusta tu email: EjemploX@algo.net');
        console.log(`Ajusta tu email: EjemploX@algo.net el actual ${datafrom.get('email')}`)
    }
    event.preventDefault();
}



var forma = document.getElementById('form1');
var loga = document.getElementById('logaaa');
forma.addEventListener('submit', logSubmit);


