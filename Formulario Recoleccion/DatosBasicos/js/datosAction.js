var myDate = new Date();
var thisMonth = new Date(myDate.getFullYear(), myDate.getMonth(), 1);
console.log("Formatted date start: " + formatDate(thisMonth));
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
    var fecha1=strdate1.split('/');
    dt1 = new Date(fecha1[2], fecha1[1], fecha1[0]);
    fecha2=strdate2.split('/');
    dt2 = new Date(fecha2[2], fecha2[1], fecha2[0]);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.floor(Math.abs(diff / 365.25));
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function logSubmit(event) {


    var data = new FormData();
    data.append("name", document.getElementById("element_1").value);
    data.append("email", document.getElementById("element_3").value);
    data.append("sex", document.getElementById("element_5").value);
    data.append("phone", document.getElementById("element_6").value);
    if (validateEmail(data.get('email'))) {
        var valR = /\+/;
        if (valR.test(data.get('phone')) || data.get('phone') == "" || data.get('phone') == null) {
            data.append("date", `${document.getElementById("element_4_1").value}/${document.getElementById("element_4_2").value}/${document.getElementById("element_4_3").value}`);
            var edad=diff_years(formatDate(thisMonth),data.get('date'));
            if(edad>=18){
                var ifConnected = window.navigator.onLine;
                if (ifConnected) {
                    alert('Connection available');
                    loga.textContent = `datos: ${data.get('name')}|${data.get('sex')}|${data.get('date')} (${edad})|${data.get('email')}|${data.get('phone')}`;
                } else {
                    alert('Conexión a internet restringida o sin conexion');
                    loga.textContent = `Sin conexión a internet intente mas tarde: ${event.timeStamp}`;
                }
            }else{
                console.log(`(${edad} años) No es mayor de edad, así que no puede firmar el consentimiento informado (Recuerda que cambiar de fecha no te exime de problemas legales por falsedad en documento).`);
                alert(`(${edad} años) No es mayor de edad, así que no puede firmar el consentimiento informado (Recuerda que cambiar de fecha no te exime de problemas legales por falsedad en documento).`);
            }
           

        } else {
            alert('Su número télefonico debe incluir el indicativo del pais EJ: +57321532000');
            console.log(`su número debe incluir el indicativo del pais el actual: ${data.get('phone')}`)
        }

    } else {
        alert('Ajusta tu email: EjemploX@algo.net');
        console.log(`Ajusta tu email: EjemploX@algo.net el actual ${data.get('email')}`)
    }
    event.preventDefault();
}



var forma = document.getElementById('form1');
var loga = document.getElementById('logaaa');
forma.addEventListener('submit', logSubmit);


var aaa=modifyPdf();