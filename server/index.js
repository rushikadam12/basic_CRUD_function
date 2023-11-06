import express from "express"
import mysql from 'mysql'
import cors from 'cors';
const app=express();
app.use(cors())

const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root@123',
    database:'basic_crud',
})

app.use(express.json());
app.put('/updateInfo/:oldname',(req,res)=>{
        const oldname=req.params.oldname;
        const {name,salary,age,position,country}=req.body;
        const qr='UPDATE employees SET name=? WHERE name=?';
        db.query(qr,[name,oldname],(err,result)=>{
                if(err){
                    res.status(404);
                    console.log('data is not updated')
                }
                else{
                    res.send('data is updated in database');
                }
        })
})

app.delete('/deleteInfo/:emp',(req,res)=>{
    const name=req.params.emp;
    
    db.query('DELETE FROM employees WHERE name=?',name,(err,result)=>{
        if(err){
            res.status(404);
            console.log('Data not found');
        }else{
            res.send('Data is delete successfully');
        }
    })
})

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const salary=req.body.salary;
    const age=req.body.age;
    const country=req.body.country;
    const position=req.body.position;
    db.query('INSERT INTO employees (salary,age,country,name,position) VALUES(?,?,?,?,?)',[salary,age,country,name,position],(err,result)=>{
        //(err,result)this function will check if our query is successful or not if yes the return console.log('data added successfully)and if not then return the error which is occurred
        if(err){
            console.log(err);
            res.status(500).send('dat not added in database');
        }
        else{
            
            res.send('data added successfully');
        }

    })
    //we use '?' so it will hide data which we are passing and we want to pass user data not hardcoded data so here we create one array which will pass the values as we write in query

})
app.get('/getInfo',(req,res)=>{
    db.query('SELECT * FROM employees',(err,result)=>{
        if(err){
            res.status(500).send("Error while fetching  data");
        }
        else{
            res.send(result);
        }
})
})


app.listen(3000,()=>{
    console.log("Server is running");
})