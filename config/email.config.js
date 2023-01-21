
const nodemailer= require('nodemailer');

const mail={
    user: 'danielito710rmb@gmail.com',
    pass: "rtlrukxtkhgsqjuk"
}

const {verificarRegistro, restrablecerPassword }= require('../template/verificarRegistro');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "pop.gmail.com",
    port: 587,
    tls:{
      rejectUnauthorized:false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  });
  const sendEmail= async (email, subject, html)=>{
    try {

      // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'MHCode <${mail.user}>', // sender address
    to: email, // list of receivers
    subject , // Subject line
    text: "Hello world?", // plain text body
    html , // html body
  });
      
    } catch (error) {
      console.log(error);
    }
  }

  const getTemplate= (name,token)=>{
    return `
    <head>
       <link rel="stylesheet href="./style.css">
    <head/>

    <div id:"email___content">
      <img src="">
      <h2>Hola ${name}<h2>
      <p>Para confirmar tu cuenta, intresa al siguiente enlace</p>
      <a href="http://localhost:4200/confirmarEmail/${token}">Confirmar cuenta</a>
    </div>
    
    `
    
  }

  const templateResetPassword=(name,token)=>{
       
    return `
    <head>
       <link rel="stylesheet href="./style.css">
    <head/>

    <div id:"email___content">
      <img src="">
      <h2>Hola ${name}<h2>
      <p>Para restablecer tu password, intresa al siguiente enlace</p>
      <a href="http://localhost:4200/restablecer-contrasena/${token}">restablecer Password</a>
    </div>
    
    `
  }

  

  //console.log("Message sent: %s");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
 // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


//main().catch(console.error);

module.exports= {sendEmail, getTemplate, templateResetPassword};