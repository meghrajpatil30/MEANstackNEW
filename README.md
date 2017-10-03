MEAN stack app

/src folder contains all server side files.

/model contains user.ts which is for database schema.


/serverdata/ServerData.ts contains the functions for fetching data which returns the promises. 
All these functions  called in /router/UserRouter.ts  

  
"index.ts" and "server.ts" files  are for creating server and connection and some error handling functions.

************
/dest contains .js files and static files i.e. angular and html files 

/dest/public/app.ts  contains contollers,routing. it also calls all APIs 


/dest/public/app/users/views/  contains the html files for adding and listing users
/dest/public/app/home/views/   contains header.html file for  header