//Add dependency
const mysql = require('mysql2');

//add dependencies
const http = require('http');
const url = require('url');
const sailors = require('./lib/sailors');
const boats = require('./lib/boats');
const reserves = require('./lib/reserves');



// create a connection object
const db= mysql.createConnection({
    host : "localhost",
    user : "root", //  MySQL user name
    password: "Ateeb@17",  //  MySQL password
    multipleStatements: true
    });

    db.connect((err)=>{
        if (err) throw err;
        console.log("Connected to the MySQL server");
     });


     let sql = "CREATE DATABASE IF NOT EXISTS SailingAdventure";
     db.query(sql, (err)=>{
         if (err) throw err;
         console.log("Database Created");
     });
     sql = "CREATE TABLE IF NOT EXISTS SailingAdventure.Sailors ("
        +" S_id INT PRIMARY KEY AUTO_INCREMENT," 
        + "S_name VARCHAR(45) NOT NULL,"
        + "B_date DATE NOT NULL,"
        + "Rate INT NOT NULL);"
         + "CREATE TABLE IF NOT EXISTS SailingAdventure.Boats ("
         +" B_id INT PRIMARY KEY AUTO_INCREMENT," 
         + "B_name VARCHAR(45) NOT NULL,"
         + "Type VARCHAR(100) NOT NULL);"
         + "CREATE TABLE IF NOT EXISTS SailingAdventure.Reserves ("
         +" S_id INT," 
         + "B_id INT,"
         + "Day DATE NOT NULL,"
         + "PRIMARY KEY(S_id, B_id, Day),"
         + "CONSTRAINT FOREIGN KEY(S_id) REFERENCES Sailors(S_id) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT FOREIGN KEY(B_id) REFERENCES Boats(B_id) ON UPDATE CASCADE ON DELETE CASCADE)";
     db.query(sql, (err)=>{
         if (err) throw err;
         console.log("All tables Created");
     });
     
    //Start the server
    const server = http.createServer((req,res)=>{
        const baseURL = "http://" + req.headers.host + '/';
        const parsedUrl = new URL(req.url, baseURL); 
        //get the untrimed path from the url
        const path = parsedUrl.pathname; 
        //Get the query string as an object
        const searchParam = parsedUrl.searchParams
        const entries = searchParam.entries();
        const qs = Object.fromEntries(entries);
        //Get the HTTP method
        const method = req.method.toUpperCase();
    
        //Route based on the request method
        switch (method){
            case 'POST':
                switch(path){
                    case '/sailors':
                    case '/sailors/': //Add Saillor
                        sailors.addSailor(db, qs, (statusCode, resStr)=>{
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHead(statusCode);
                        res.end(resStr);
                        
                    }); 
                    break;
                    
                    case '/boats':
                    case '/boats/': 
                    boats.addBoat(db, qs, (statusCode, resStr)=>{
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHead(statusCode);
                        res.end(resStr);
                    });   
                        break;
    
                    case '/reserves':
                    case '/reserves/':
                        reserves.addReserves(db,qs,(statusCode, resStr)=>{
                        res.setHeader('content-type','text/plain; charset="utf-8"');
                        res.writeHead(statusCode);
                        res.end(resStr);
                        
                        });
                        break;
                }
                break;
                case 'GET':
                    switch(path){
                        case '/sailors/older':
                        case '/sailors/older/': 
                            sailors.olderSailorsList(db, qs, (statusCode, results)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                let rows = results.map(function(item){
                                    let values =Object.values(item);
                                return values.join(' ');
                                }).join('\n');
                                rows += '\n';
                                res.end(rows);
                        
                    }); 
                    break;
                        case '/sailors/younger':
                        case '/sailors/younger/': 
                            sailors.youngerSailorsList(db, qs, (statusCode, results)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                let rows = results.map(function(item){
                                    let values =Object.values(item);
                                return values.join(' ');
                                }).join('\n');
                                rows += '\n';
                                res.end(rows);
                        
                    }); 
                    break;
                        case '/boats/list':
                        case '/boats/list/': 
                            boats.boatList(db, qs, (statusCode, results)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                let rows = results.map(function(item){
                                    return item.B_id + ' ' + item.B_name;
                                }).join('\n');
                                rows += '\n';
                                res.end(rows);
                        
                    }); 
                    break;
                        case '/boats/count/':
                        case '/boats/count':
                            boats.getBoatCount(db,qs,(statusCode, count)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                res.end(`The number of Boats of the type ${qs.Type} is ${count}`);
                                
                                });
                    break;
                        case '/reserves/before/':
                        case '/reserves/before':
                            reserves.getReservationsBeforeDate(db, qs, (statusCode, results)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                let rows = results.map(function(item){
                                    let values =Object.values(item);
                                return values.join(' ');
                                }).join('\n');
                                rows += '\n';
                                res.end(rows);
                                
                                });
                    break;
                        case '/reserves/after/':
                        case '/reserves/after':
                            reserves.getReservationsAfterDate(db, qs, (statusCode, results)=>{
                                res.setHeader('content-type','text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                let rows = results.map(function(item){
                                    let values =Object.values(item);
                                return values.join(' ');
                                }).join('\n');
                                rows += '\n';
                                res.end(rows);
                                
                                });
                    }
                    case 'DELETE': 
                    switch(path) {
                        case '/sailors':
                        case '/sailors/': 
                        sailors.delete(db, qs, (statusCode, results) => {
                            res.setHeader('content-type', 'text/plain; charset="utf-8"');
                            res.writeHead(statusCode);
                            res.end(JSON.stringify(results));
                        });
                            break;
                
                        case '/boats':
                        case '/boats/': 
                        boats.delete(db, qs, (statusCode, results) => {
                            res.setHeader('content-type', 'text/plain; charset="utf-8"');
                            res.writeHead(statusCode);
                            res.end(JSON.stringify(results));
                        });
                            break;
                
                        case '/reserves':
                        case '/reserves/': 
                            reserves.delete(db, qs, (statusCode, results) => {
                                res.setHeader('content-type', 'text/plain; charset="utf-8"');
                                res.writeHead(statusCode);
                                res.end(JSON.stringify(results));
                            });
                            break;
                    }
                    break;
                
                case 'PUT': 
                    switch(path) {
                        case '/sailors':
                        case '/sailors/':
                        sailors.update(db, qs, (results) => {
                            console.log(results);
                            res.end('The update is successfull');
                        });
                            break;
                
                        case '/boats':
                        case '/boats/': 
                        boats.update(db, qs, (results) => {
                            console.log(results);
                            res.end('The update is successfull');
                        });
                            break;
                    }
                    break;                
            }
        });
    
        server.listen(3030, function(){
            console.log('Server running on port 3030 ....');
        });