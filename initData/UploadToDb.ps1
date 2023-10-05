function Insert-ValuesToDb {
    param (
        [string]$insert,
        [string]$values
    )
    $configurationFile = Get-Content -Path "../backend/appsettings.json" -Raw | ConvertFrom-Json

    $connectionSection = $configurationFile.ConnectionStrings
    $dbHost = $connectionSection.Host
    $dbName = $connectionSection.Database
    $dbUser = $connectionSection.Username
    $dbPassword = $connectionSection.Password
    $env:PGPASSWORD = $dbPassword

    $psql = "psql -U $dbUser -h $dbHost -d $dbName"
    $command = "$psql -c `"$insert $values`""
    Invoke-Expression -Command $command
}

function Parse-CourseValueString {
    param (
        $course
    )
    $name = $course.Name.Trim()
    $nameNormalized = $name.ToUpperInvariant()
    $address = $course.Address.Trim()
    $result = "('$name', '$nameNormalized', '$address', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),"
    return $result
}
function Parse-HoleValueString {
    param (
        $courseId,
        $hole
    )

    $nthHole = $hole.NthHole
    $length = $hole.Length
    $par = $hole.Par
    $result = "($nthHole, $length, $par, $courseId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)|"
    return $result
}

function Parse-Data {
    $initialData = Get-Content -Path "./courses.json" -Raw | ConvertFrom-Json
    $itemCountToUpload = $initialData.Length
    $courseInsertSql = "INSERT INTO course (name, name_normalized, address, created_at, updated_at) VALUES"
    $holeInsertSql = "INSERT INTO hole (nth_hole, length, par, course_id, created_at, updated_at) VALUES"
    $courseValues = ""
    $holeValues = ""
    $idCount = 1
    $itemsParsed = 0
    $batchCount = 0;
    Write-Host "Parsing courses"
    while ($itemsParsed -lt $itemCountToUpload) {
        # Append to the VALUES portion of insert SQL statement
        $courseValues += Parse-CourseValueString -course $initialData[$itemsParsed]
        foreach ($hole in $initialData[$itemsParsed].Holes) {
            # Prepare holes for inserting; append to the VALUES portion of sql statement
            $holeValues += Parse-HoleValueString -hole $hole -courseId $idCount
        }
        $idCount++
        $itemsParsed++
        $batchCount++
        if ($batchCount -eq 200) {
            Insert-ValuesToDb -insert $courseInsertSql -values $courseValues.TrimEnd(',')
            $batchCount = 0;
            $courseValues = ""
            Write-Host "$itemsParsed out of $itemCountToUpload done"
        }
    }
    Insert-ValuesToDb -insert $courseInsertSql -values $courseValues.TrimEnd(',')
    Write-Host "Courses done"

    $holeValuesArr = $holeValues.Split("|")
    $itemsToUpload = $holeValuesArr.Length
    $itemsUploaded = 0
    Write-Host "Parsing Holes"
    while ($itemsUploaded -lt $itemsToUpload) {
        if (($itemsToUpload - $itemsUploaded) -lt 200) {
            $batch = ($holeValuesArr[($itemsUploaded)..($itemsToUpload)] -join ",").TrimEnd(",")
            $itemsUploaded += ($itemsToUpload - $itemsUploaded)
        } else {
            $batch = $holeValuesArr[($itemsUploaded)..($itemsUploaded + 199)] -join ","
            $itemsUploaded += 200
        }
        Insert-ValuesToDb -insert $holeInsertSql -values $batch
        Write-host "$itemsUploaded out of $itemsToUpload done"
    }
}

#script starts here
$appsettingsPath = "../backend/appsettings.json"

if (Test-Path $appsettingsPath) {
    Write-Host "Appsettings found"
    Parse-Data 
} else {
    Write-Host "appsettings.json not found in project"
    exit 1
}



