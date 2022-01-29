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

function logSubmit(event) {

    loga.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    var data = new FormData();
    data.append("name", document.getElementById("element_1").value);
    data.append("email", document.getElementById("element_4_1").value);
    var ifConnected = window.navigator.onLine;
    if (ifConnected) {
        alert('Connection available');
    } else {
        alert('Connection not available');
    }
    event.preventDefault();
}

var forma = document.getElementById('form1');
var loga = document.getElementById('logaaa');
forma.addEventListener('submit', logSubmit);


var aaa=modifyPdf();
