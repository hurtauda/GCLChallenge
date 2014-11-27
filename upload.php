<?php
if(isset($_FILES['image'])) {
    $dossier = 'upload/';
    $fichier = basename($_FILES['image']['name']);
    if (move_uploaded_file($_FILES['image']['tmp_name'], $dossier . $fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
    {
        $result = exec('/bin/sh scripts/scriptUpload.sh ' . $dossier . $fichier . ' ' . $fichier);
        header('Location: index.html');
    } else //Sinon (la fonction renvoie FALSE).
    {
        echo 'Echec de l\'upload !';
    }
}
