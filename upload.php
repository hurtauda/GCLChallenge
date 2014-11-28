<?php
if(isset($_FILES['image'])) {
    $dossier = 'upload/';
    $fichier = basename($_FILES['image']['name']);

    preg_match("/^(.+)\\.(.+)$/", $fichier, $matches);

    if ((strtolower($matches[2]) === "jpg") || (strtolower($matches[2]) === "jpeg") || (strtolower($matches[2]) === "png")) {

        if (move_uploaded_file($_FILES['image']['tmp_name'], $dossier . $fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
        {
            file_put_contents('img/d/user/'.$matches[1].'.prop', $_POST['description']);
            file_put_contents('img/m/user/'.$matches[1].'.prop', $_POST['description']);

            $result = exec('/bin/sh scripts/scriptUpload.sh ' . $dossier . $fichier . ' ' . $fichier);
            header('Location: index.html');
        } else //Sinon (la fonction renvoie FALSE).
        {
            echo 'Upload failed ! Please try again later...';
            echo '<a href=index.html/>';
        }
    } else {
        echo 'Forbidden file ! (only png and jpg)</br>';
        echo '<a href="index.html">Go back</a>';
    }
}
