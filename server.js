const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    port:587,
    host:"smtp.gmail.com",
    auth:{
        user:"krishnashyam1977456@gmail.com",
        pass:"jcindvdhugxxzpri"
    },
    secure:true,
});

app.post("/send-mail",(req,res)=>{
    const to = req.body.to;
    const url = req.body.url;
    const mailData = {
        from:"krishnashyam1977456@gmail.com",
        to:to,
        subject:"join the video chat with me",
        html:`<p>Hey there,</p><p>Come and join me for a video chat here - ${url}</p>`
    };
    transporter.sendMail(mailData,(error,info)=>{
        if(error){
            return console.log(error);
        }
        res.status(200).send({message:"Invitation sent!!!",message_id: info.messageId})
    });
});

server.listen(process.env.PORT || 3030);