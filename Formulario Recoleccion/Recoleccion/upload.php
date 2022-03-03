<?php
if ($_FILES){
    $uploadDirectory="uploads/";
    $uploadFileCopy=$uploadDirectory.basename($_FILES['file']['name']);
    if(move_uploaded_file($_FILES['file']['tmp_name'],$uploadFileCopy)){
        echo 'El archivo fue subido correctamente';
    }else{
        echo 'Archivo no fue subido';
    }
}
?>