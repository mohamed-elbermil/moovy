<?php
// Informations de connexion à la base de données
$hostname = 'localhost';
$username = 'root';
$password = '';
$database = 'moovy';

// Connexion à la base de données
$connexion = mysqli_connect($hostname, $username, $password, $database);

// Vérification de la connexion
if ($connexion->connect_error) {
    die('La connexion à la base de données a échoué : ' . $connexion->connect_error);
}

echo 'Connexion réussie à la base de données.';

// Vous pouvez maintenant exécuter vos requêtes SQL ici

// Fermer la connexion
$connexion->close();
