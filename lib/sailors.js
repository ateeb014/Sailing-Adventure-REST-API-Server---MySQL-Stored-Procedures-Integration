
exports.addSailor = function (db, qs, cb){
    let sql = "Call SailingAdventure.AddSailor(?,?,?,@msg); Select @msg";
    db.query(sql,[qs.S_name, qs.B_date, qs.Rate],(err,results)=>{
        if(err) throw err;
        console.log(results[1][0]['@msg']);
        cb(200, results[1][0]['@msg']);
    });
};


exports.olderSailorsList = function (db, qs, cb){
    let sql = "Call SailingAdventure.olderSailorsList(?)";
    db.query(sql,[qs.Age],(err,results)=>{
        if(err) throw err;
        console.log(results[0]);
        cb(200, results[0]);
    });
};

exports.youngerSailorsList = function (db, qs, cb){
    let sql = "Call SailingAdventure.youngerSailorsList(?)";
    db.query(sql,[qs.Age],(err,results)=>{
        if(err) throw err;
        console.log(results[0]);
        cb(200, results[0]);
    });
};

exports.delete = function (db, qs, cb) {
    let sql = `DELETE FROM SailingAdventure.Sailors WHERE S_id=?`;
    let values = [qs.S_id];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(200,results);
    });
};

exports.update = function (db, obj, cb) {
    let sql= ""
    sql= `SELECT * FROM SailingAdventure.Sailors WHERE S_id= \'${obj.S_id}\'`;
        db.query(sql, (err, results) => {
            if (err) {
            cb(err.message);
            }else if ( results && results.length ===0){
                cb('Sailor not found');
            } else {
                let keys = Object.keys(obj);
                const name =keys.includes('S_name')? obj.S_name: results[0].S_name;
                const date =keys.includes('B_date')? obj.B_date: results[0].B_date;
                const rate =keys.includes('Rate')? obj.Rate: results[0].Rate;
                sql= "UPDATE SailingAdventure.Sailors SET S_name = ?, B_date = ?, Rate = ? WHERE S_id = ?";
                db.query(sql, [name, date, rate, obj.S_id], (err, results) =>{
                if (err) throw err
                console.log('The update is successful');
                cb(results);
                })
            }
        });
    };


/*

// Stored procedure to add into sailors table; (Checks the sailor age and if sailor already exists or not)

DELIMITER $$
CREATE PROCEDURE SailingAdventure.AddSailor(IN name VARCHAR(45), IN s_B_date DATE, IN s_Rate INT, OUT msg VARCHAR(255))
BEGIN
DECLARE sailorAge INT;
DECLARE sailorCount INT DEFAULT 0;
SET sailorAge = FLOOR(datediff(curdate(), s_B_date)/365);
SELECT COUNT(*) INTO sailorCount FROM SailingAdventure.Sailors WHERE S_name = name;
IF sailorCount > 0 THEN
SET msg = 'Sailor already exists';
ELSE
IF sailorAge < 24 THEN
SET msg = 'Sailor is below allowed age.';
ELSE
INSERT INTO SailingAdventure.Sailors (S_name, B_date, Rate) VALUES (name, s_B_date, s_Rate);
SET msg = 'Sailor added.';
END IF;
END IF;
END $$


// stored procedure to get the older Sailor list:

DELIMITER $$
CREATE PROCEDURE SailingAdventure.olderSailorsList(IN Age INT)
BEGIN
SELECT * FROM SailingAdventure.Sailors
WHERE FLOOR(datediff(curdate(), B_date)/365) > Age;
End $$

// stored procedure to get the younger Sailor list:

DELIMITER $$
CREATE PROCEDURE SailingAdventure.youngerSailorsList(IN Age INT)
BEGIN
SELECT * FROM SailingAdventure.Sailors
WHERE FLOOR(datediff(curdate(), B_date)/365) < Age;
End $$


*/
