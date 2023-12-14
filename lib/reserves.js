
exports.addReserves = function (db, qs, cb){
    let sql = "Call SailingAdventure.AddReserves(?,?,?,@msg); Select @msg";
    db.query(sql,[qs.S_id, qs.B_id, qs.Day],(err,results)=>{
        if(err) throw err;
        console.log(results[1][0]['@msg']);
        cb(200, results[1][0]['@msg']);
    })
};

exports.getReservationsBeforeDate = function (db, qs, cb){
    let sql = "Call SailingAdventure.getReservationsBeforeDate(?)";
    db.query(sql,[qs.date],(err,results)=>{
        if(err) throw err;
        console.log(results[0]);
        cb(200, results[0]);
    });
};

exports.getReservationsAfterDate = function (db, qs, cb){
    let sql = "Call SailingAdventure.getReservationsAfterDate(?)";
    db.query(sql,[qs.date],(err,results)=>{
        if(err) throw err;
        console.log(results[0]);
        cb(200, results[0]);
    });
};

exports.delete = function (db, qs, cb) {
    let sql = `DELETE FROM SailingAdventure.Reserves WHERE S_id=? AND B_id=? AND Day=?`;
    let values = [qs.S_id, qs.B_id, qs.Day];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(200,results);
    });
};


/*


// Stored procedure to add into reserves table

DELIMITER $$
CREATE PROCEDURE SailingAdventure.AddReserves(IN sid INT, IN bid INT, IN D DATE, OUT msg VARCHAR(255))
BEGIN
DECLARE sailorRate INT;
DECLARE boatType VARCHAR(100);
SELECT Rate INTO sailorRate FROM SailingAdventure.Sailors WHERE S_id = sid;
SELECT Type INTO boatType FROM SailingAdventure.Boats WHERE B_id = bid;
IF boatType = 'Fishing Vessel' AND sailorRate <= 7 THEN
SET msg = ' Reservation cannot be done for requested boat – Sailor rate is low ';
ELSEIF boatType = 'Sailboat' AND sailorRate <= 5 THEN
SET msg = ' Reservation cannot be done for requested boat – Sailor rate is low ';
ELSEIF boatType = 'Bass boat' AND sailorRate > 2 THEN
SET msg = 'Cannot reserve a Bass boat- Sailor rate must be less than or equal to 2';
ELSE
INSERT INTO SailingAdventure.Reserves (S_id, B_id, Day) VALUES (sid, bid, D);
SET msg = 'Reservation added successfully.';
END IF;
END $$


//stored procedure to get reservations before the given date
DELIMITER $$
CREATE PROCEDURE SailingAdventure.getReservationsBeforeDate(IN D DATE)
BEGIN
SELECT b.B_id, b.B_name
FROM SailingAdventure.Boats b JOIN SailingAdventure.Reserves ON b.B_id=Reserves.B_id
WHERE Reserves.Day < D;
END $$

//stored procedure to get reservations after the given date
DELIMITER $$
CREATE PROCEDURE SailingAdventure.getReservationsAfterDate(IN D DATE)
BEGIN
SELECT b.B_id, b.B_name
FROM SailingAdventure.Boats b JOIN SailingAdventure.Reserves ON b.B_id=Reserves.B_id
WHERE Reserves.Day > D;
END $$


*/



