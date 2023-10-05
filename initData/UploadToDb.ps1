if (Test-Path "../backend/appsettings.json") {

} else {
    Write-Host "appsettings.json not found in project"
}

$dbHost = "your_postgresql_server"
$dbName = "your_database_name"
$dbUser = "your_username"
$dbPassword = "your_password"

