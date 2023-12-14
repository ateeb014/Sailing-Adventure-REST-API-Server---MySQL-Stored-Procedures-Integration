
exports.addBoat = function (db, qs, cb){
    let sql = "Call SailingAdventure.AddBoat(?,?,@msg); Select @msg";
    db.query(sql,[qs.B_name, qs.Type],(err,results)=>{
        if(err) throw err;
        console.log(results[1][0]['@msg']);
        cb(200, results[1][0]['@msg']);
    });
};

exports.getBoatCount= function (db,qs,cb){
    let sql = "CALL SailingAdventure.GetBoatCount(?,@cnt); Select @cnt";
    db.query(sql,[qs.Type],(err,results)=>{
        if(err) throw err;
        console.log(`The number of Boats of the type ${qs.Type} is ${results[1][0]['@cnt']}`);
        cb(200, results[1][0]['@cnt']);
    });

};

exports.boatList = function (db, qs, cb){
    let sql = "Call SailingAdventure.boatList(?)";
    db.query(sql,[qs.Type],(err,results)=>{
        if(err) throw err;
        console.log(results[0]);
        cb(200, results[0]);
    });
};

exports.update = function (db, obj, cb) {
    let sql= ""
    sql= `SELECT * FROM SailingAdventure.Boats WHERE B_id= \'${obj.B_id}\'`;
        db.query(sql, (err, results) => {
            if (err) {
            cb(err.message);
            }else if ( results && results.length ===0){
                cb('Boat not found');
            } else {
                let keys = Object.keys(obj);
                const Name =keys.includes('B_name')? obj.B_name: results[0].B_name;
                const Type =keys.includes('Type')? obj.Type: results[0].Type;
                sql= "UPDATE SailingAdventure.Boats SET B_name = ?, Type = ? WHERE B_id = ?";
                db.query(sql, [Name, Type, obj.B_id], (err, results) =>{
                if (err) throw err
                console.log('The update is successful');
                cb(results);
                })
            }
        });
    };


    exports.delete = function (db, qs, cb) {
        let sql = `DELETE FROM SailingAdventure.Boats WHERE B_id=?`;
        let values = [qs.B_id];
    
        db.query(sql, values, (err, results) => {
            if (err) throw err;
            cb(200,results);
        });
    };
    

/*

// stored procedure to get the boat id and name by type:

DELIMITER $$
CREATE PROCEDURE SailingAdventure.boatList(IN b_type Varchar(100))
BEGIN
SELECT B_id, B_name FROM SailingAdventure.Boats WHERE Type=b_type;
END $$


//Stored procedure to add values into Boats table;

DELIMITER $$
CREATE PROCEDURE SailingAdventure.AddBoat(IN name VARCHAR(45), IN p_Type VARCHAR(100), OUT msg VARCHAR(255)) 
BEGIN DECLARE boatCount INT DEFAULT 0; 
SELECT COUNT(*) INTO boatCount FROM SailingAdventure.Boats WHERE B_name = name AND Type = p_Type; 
IF boatCount = 0 THEN INSERT INTO SailingAdventure.Boats (B_name, Type) VALUES (name, p_Type);
SET msg = 'Boat added successfully.';
ELSE
SET msg = 'Boat already exists'; 
END IF;
END $$

// stored procedure to get the boat count 

DELIMITER $$
CREATE PROCEDURE SailingAdventure.getBoatCount(IN b_Type VARCHAR(100), OUT boatCount INT)
BEGIN
SELECT COUNT(*) INTO boatCount FROM SailingAdventure.Boats WHERE Type=b_Type;
END $$


*/