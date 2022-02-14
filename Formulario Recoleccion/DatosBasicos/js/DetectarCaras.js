$("#start-btn").click(function(){
$('#picture').faceDetection({
    complete: function (faces) {
        console.log(faces);
        
        for (var i = 0; i < faces.length; i++) {
            $('<div>', {
                'class':'face',
                'css': {
                    'position': 'absolute',
                    'left':     faces[i].x * faces[i].scaleX + 'px',
                    'top':      faces[i].y * faces[i].scaleY + 'px',
                    'width':    faces[i].width  * faces[i].scaleX + 'px',
                    'height':   faces[i].height * faces[i].scaleY + 'px'
                }
            })
            .insertAfter(this);
        }
    },
    error:function (code, message) {
        alert('Error: ' + message);
    }
})
});