const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser')

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'testdb'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());

 //Insert Appointment
 app.get('/addappo/:fname/:lname/:p_phone/:email/:doctor_name/:date', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let post = {fname:req.params.fname, lname:req.params.lname, p_phone:req.params.p_phone, email:req.params.email, doctor_name:req.params.doctor_name , date:req.params.date};
    let sql = "INSERT INTO appointment SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Appointment 1 added...');
    });
});

//Retrive data from inquries
 app.get('/selectappo', (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = 'SELECT * FROM appointment';
         let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
         return res.json({
            data: result
         })
    });
 });

app.get('/insappo/:app_id',(req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT *
               FROM appointment
               WHERE app_id = '${req.params.app_id}'`;
    let query = db.query(sql,(err,result) => {
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//update appointment
app.get('/updateappo/:app_id/:fname/:lname/:p_phone/:email/:doctor_name/:date', (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    let post = {app_id:req.params.app_id , fname:req.params.fname, lname:req.params.lname, p_phone:req.params.p_phone, email:req.params.email, doctor_name:req.params.doctor_name , date:req.params.date , invoice_no:req.params.app_id};
    let sql = `UPDATE appointment SET fname='${req.params.fname}',lname='${req.params.lname}',p_phone='${req.params.p_phone}',email='${req.params.email}',doctor_name='${req.params.doctor_name}',date='${req.params.date}' WHERE app_id='${req.params.app_id}'`;
    let query = db.query(sql,post,(err,result) => {
        if(err) throw err;
        console.log(result);
        return res.send('appointment updated');
    });
});


// Delete post
app.get('/deleteappo/:app_id', (req, res) => {
    let sql = `DELETE FROM appointment WHERE app_id = ${req.params.app_id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('appointment deleted...');
    });
});


//______________________BILL________________________

 //Insert Bill
 app.get('/addbill/:date/:OPD_item/:OPD_Qty/:OPD_amount/:OPD_total/:Pharmacy_item/:Pharmacy_Qty/:Pharmacy_amount/:Pharmacy_total/:sub_total/:discount/:total/:bill_type/:no_of_days/:cname/:cadd/:cemail', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let post = {date:req.params.date, OPD_item:req.params.OPD_item, OPD_Qty:req.params.OPD_Qty, OPD_amount:req.params.OPD_amount, OPD_total:req.params.OPD_total, Pharmacy_item:req.params.Pharmacy_item, Pharmacy_Qty:req.params.Pharmacy_Qty , Pharmacy_amount:req.params.Pharmacy_amount , Pharmacy_total:req.params.Pharmacy_total , sub_total:req.params.sub_total , discount:req.params.discount ,  total:req.params.total ,  bill_type:req.params.bill_type ,  no_of_days:req.params.no_of_days , cname:req.params.cname , cadd:req.params.cadd , cemail:req.params.cemail};
    let sql = "INSERT INTO invoices SET ?";
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Bill 1 added...');
    });
});

//get 1 bill
app.get('/insbill/:invoice_no',(req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let sql = `SELECT *
               FROM invoices
               WHERE invoice_no = '${req.params.invoice_no}'`;
    let query = db.query(sql,(err,result) => {
        if(err) throw err;
        console.log(result);
        return res.json({
            data: result
        })
    });
});

//Retrive data from inquries
app.get('/insbill', (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    let sql = 'SELECT * FROM invoices';
         let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
         return res.json({
            data: result
         })
    });
 });

//update Bill
app.get('/upbill/:invoice_no/:date/:OPD_item/:OPD_Qty/:OPD_amount/:OPD_total/:Pharmacy_item/:Pharmacy_Qty/:Pharmacy_amount/:Pharmacy_total/:sub_total/:discount/:total/:bill_type/:no_of_days/:cname/:cadd/:cemail', (req, res) => {
    //res.set('Access-Control-Allow-Origin', '*');
    let post = {invoice_no:req.params.invoice_no , date:req.params.date, OPD_item:req.params.OPD_item, OPD_Qty:req.params.OPD_Qty, OPD_amount:req.params.OPD_amount, OPD_total:req.params.OPD_total, Pharmacy_item:req.params.Pharmacy_item, Pharmacy_Qty:req.params.Pharmacy_Qty , Pharmacy_amount:req.params.Pharmacy_amount , Pharmacy_total:req.params.Pharmacy_total , sub_total:req.params.sub_total , discount:req.params.discount ,  total:req.params.total ,  bill_type:req.params.bill_type ,  no_of_days:req.params.no_of_days , cname:req.params.cname , cadd:req.params.cadd , cemail:req.params.cemail};
    let sql = `UPDATE invoices SET date='${req.params.date}',OPD_item='${req.params.OPD_item}',OPD_Qty='${req.params.OPD_Qty}',OPD_amount='${req.params.OPD_amount}',OPD_total='${req.params.OPD_total}',Pharmacy_item='${req.params.Pharmacy_item}',Pharmacy_Qty='${req.params.Pharmacy_Qty}',Pharmacy_amount='${req.params.Pharmacy_amount}',Pharmacy_total='${req.params.Pharmacy_total}', sub_total='${req.params.sub_total}',discount='${req.params.discount}',total='${req.params.total}',bill_type='${req.params.bill_type}',no_of_days='${req.params.no_of_days}', cname='${req.params.cname}',cadd='${req.params.cadd}' ,cemail='${req.params.cemail}' WHERE invoice_no='${req.params.invoice_no}'`;
    let query = db.query(sql,post,(err,result) => {
        if(err) throw err;
        console.log(result);
        return res.send('Bill updated');
    });
});



app.listen('3000', () => {
    console.log('Server started on port 3000');
});