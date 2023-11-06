# Disc golf application

It's a rip from popular disc golf applications. Functionalities I provide:

- Search and filter all the courses in finland
- Track rounds, unlimited amount. (Well as much as my azure subscription lets me handle...)
- Comments on Holes, Courses, Rounds
- Statistics on Holes, Courses, Rounds (Averages, score distribution, amounts of throws tracked)

# Wanna run it?

Sure man if you really want to. <br />

Create a database in postgres, remember the name! Get your connection string and create a .appsettings for the backend:

.appsettings template
```
{
"ConnectionStrings": {
"Default": "",
"Host": "",
"Username": "",
"Database": "",
"Password": ""
},
  "Jwt": {
    "Issuer": "",
    "Audience": "",
    "Secret": "",
    "ExpiresInHours":
  }
}
```

Now if you want you can `dotnet build` the information scraper and run the executable (or run it in Visual Studio debugger). This will get all the information from frisbeegolfradat.com and store them in json files.

In the backend folder run `dotnet restore` after that migrate the database `dotnet ef database update`.

Now you can run `/initDAta/UploadToDb.ps1` to seed the database with some courses to play on!

DEV environment is:
`dotnet run` in backend folder `npm run dev` in frontend folder.

# Demo pics
![rounds view](https://raw.githubusercontent.com/JeremiasRy/frisbee-frans/main/demo-pics/friba.jpg)
![tracking a round](https://github.com/JeremiasRy/frisbee-frans/blob/main/demo-pics/friba-3.jpg)
![courses view](https://github.com/JeremiasRy/frisbee-frans/blob/main/demo-pics/friba-2.jpg)

# Things to do if I get some interest in this app:
- Some small adjustments to styling
- Add to profile section users most played courses
- Courses need a base ordering when no filter is selected (id, created_at)
- Make the welcome page look cool
- Admin actions
    - crud hole
    - crud course
- (Rating system that compares your results to all the other results available (Not going to be valid but something fun))
