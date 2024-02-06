const express=require('express')
const cors=require('cors')
const nodemailer=require('nodemailer')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send(`<h1 style="text-align:center;">Welcome</h1>`)
})

app.post('/api/sendEmail',(req,res)=>{
    res.send('Yes i Got')
    let data=req.body
    console.log(data)
    const transpoter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'jeyaramanapr22@gmail.com',
            pass: process.env.pass
        }
    })
    const mailOptions={
        from:'jeyaramanapr22@gmail.com',
        to:'iamgrootmar34@gmail.com',
        subject:'Message from client',
        html:`
        <ul>
        <li><h1>Name : ${data.name}</h1></li>
        <li><h1>Phone_number : ${data.phonenumber}</h1></li>
        <li><h1>email : ${data.email}</h1></li>
        <li><h1>message : ${data.message}</h1></li>
        </ul>
        `
    }
    transpoter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log(`email sent : ${info.response}`)
        }
    })
    transpoter.close()
})


app.listen(4000,()=>{
    console.log("server running on port:4000")
})