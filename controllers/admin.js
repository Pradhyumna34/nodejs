const mysql=require("mysql");
const asyncHandler = require("express-async-handler");

const connection = mysql.createConnection({
   host:`3.111.29.79`,
   user: 'srifh',
   password: 'SRias##2050',
   database: 'SRBillingDB'

});
connection.connect((error) => {
   if (error) {
     console.error("Failed to connect to the database", error);
   } else {
     console.log("Connected to the database");
     // Add a delay to keep the console open for a few seconds
   }
 });

 const getList = asyncHandler(async(req,res)=>{
  const query = 'SELECT * FROM assets_MainsSubject';
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error executing the query:', err);
      connection.end();
      return;
    }
    if (results.length === 0) {
      // No records found, send a custom message
      res.status(200).json({ message: 'No records found' ,status: 'null'});
    } else {
      // Records found, send them in the response
      res.status(200).json({ message: 'Data fetched sucessfully' ,status: 'success', results});
    }
     res.status(200).json(results);
});
});
const getListByID = asyncHandler(async(req,res)=>{
  const {SubjectID} = req.body;
  const query = "SELECT * FROM `assets_MainsSubject` WHERE SubjectID= "+ SubjectID;
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Error executing the query:', err);
      connection.end();
      return;
  }
  if (results.length === 0) {
      // No records found, send a custom message
      res.status(200).json({ message: 'No records found' ,status: 'null'});
    } else {
      // Records found, send them in the response
      res.status(200).json({ message: 'Data fetched sucessfully' ,status: 'success', Record:results[0]});
    }
});
});
const add = asyncHandler(async(req,res)=>{
  const {ID,FName,LName,Mobile} = req.body;
  const query = "INSERT INTO tbllogins (ID, FName, LName, Mobile) VALUES ('" + ID + "','" + FName + "','" + LName + "','" + Mobile + "')";
  ;
  connection.query(query, (err,message , fields) => {
    if (err) {
      console.error('Error executing the query:', err);
      connection.end();
      return req;
    }
     res.status(200).json({message:"Data inserted"});
});
});
const Edit = asyncHandler(async(req,res)=>{
  const {ID,FName,LName,Mobile} = req.body;
  const query = "UPDATE `tbllogins` SET `FName`='" + FName + "',`LName`='" + LName + "',`Mobile`='" + Mobile + "' WHERE `ID`='" + ID + "' ";
  ;
  connection.query(query, (err,message , fields) => {
    if (err) {
      console.error('Error executing the query:', err);
      connection.end();
      return req;
    }
     res.status(200).json({message:"Data edited"});
});
});
const Delete = asyncHandler(async(req,res)=>{
  const {ID} = req.body;
  const query = "UPDATE `tbllogins` SET `isdeleted`='1' WHERE `ID`='" + ID + "' ";
  ;
  connection.query(query, (err,message , fields) => {
    if (err) {
      console.error('Error executing the query:', err);
      connection.end();
      return req;
    }
     res.status(200).json({message:"Data edited"});
});
});
module.exports = { getList ,getListByID ,add ,Edit ,Delete};


