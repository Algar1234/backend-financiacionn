'use strict'




var  verificarRegistro= (name,token)=>{
    
  return  `
  <div style="display: grid;
grid-template-rows: 1fr 3fr 1fr;
width: 100% !important;
 min-height: 400px;
 background-color: white !important; 
 border-color: 1px solid violet;
 opacity: 1; !important">


<section style="display: flex !important;
       
       border: 1px solid violet;
       background-color: #ccc !important;
       justify-items: center !important;
       padding: 5px !important;
       align-items: center !important;" ><h2 style="text-align: center;width: 100%; justify-items: center;">Financiacion para sembrar.com</h2>
       
    </section>
 

 <section style="padding: 50px 40px; text-align: center; border: 1px solid green ;justify-items: center;"><img src="https://ci4.googleusercontent.com/proxy/KA79a4zQtWoNVXam--_dZ4Fez3WemdnsNpH63g_CsqlUIg-XLPGj_8UzyihYWGnKUJVLU23vOKoFsFHr5qYadQ=s0-d-e1-ft#https://finandy.com/images/email/register.png" width="128" height="128" style="display:inline-block;outline:none;border:none;text-decoration:none" class="CToWUd" data-bit="iit">
   <h3 style=" margin: 30px 0 20px;
   font-size: 22px;">Confirmar registro</h3>

   <section  style="    text-align: center;
   border-radius: 16px;
   background-color: #f3f7fb;
   padding: 25px 30px;
   margin-bottom: 40px;
">  
   <span>Bienvenido a <strong>Financiacion para sembrar</strong></span>
     <br>
     <br>
     <span>Haga clicken elboton de abajo para completar el registro</span> <br>
     <a href="http://localhost:4200/confirmarEmail/${token}" style="text-align:center;border-radius:10px;background-color:#00c48c;padding:10px 30px;color:white;display:inline-block;margin-top:15px;text-decoration:none" target="_blank" >Confirmar Email</a>
   </section>
 </section>

 <div style="background:#eff4fa;border-radius:0 0 10px 10px;padding:25px 50px;text-align:center"><a href="https://www.facebook.com/finandycom" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/finandycom&amp;source=gmail&amp;ust=1673367539637000&amp;usg=AOvVaw2Aj5J1wUCRY2v8ky2RNi_s"><img src="https://ci6.googleusercontent.com/proxy/9zL77magAZojHhn8he21u9qM8i8N4qjLDFg0eB9FZw1bZ76f2MwGfhBm_7L6YbraXTSzGtoCzkTLUg10PLE5_Q=s0-d-e1-ft#https://finandy.com/images/email/facebook.png" width="30" height="30" style="display:inline-block;outline:none;border:none;text-decoration:none" class="CToWUd" data-bit="iit"></a><a href="https://t.me/finandy" style="margin:0 30px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://t.me/finandy&amp;source=gmail&amp;ust=1673367539637000&amp;usg=AOvVaw0i4PNGlqXD5hplCn-qWNZM"><img src="https://ci5.googleusercontent.com/proxy/bhC1iH6UwtqFy7jc9nmlGNsDSCX-YpnFOWcMG8gKk9C-Qy7NefQ5mNcGnsQbu3Elg-uN1-FLHoSMCbtEfX7l5w=s0-d-e1-ft#https://finandy.com/images/email/telegram.png" width="30" height="30" style="display:inline-block;outline:none;border:none;text-decoration:none" class="CToWUd" data-bit="iit"></a><a href="https://finandy.com/contacts" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://finandy.com/contacts&amp;source=gmail&amp;ust=1673367539637000&amp;usg=AOvVaw0l3dCpP55I-dyDdYsqjUw1"><img src="https://ci4.googleusercontent.com/proxy/sC3C2ko5e2jzklbZ2HXzryEA9aqm4RHXcSzpIoQTpA2LXzwRSgs6LqHDI4LMBtzZ8Ncz75Vn91JUC1IXvnyf7w=s0-d-e1-ft#https://finandy.com/images/email/contacts.png" width="30" height="30" style="display:inline-block;outline:none;border:none;text-decoration:none" class="CToWUd" data-bit="iit"></a></div>
</div>
    
`;


} 
var restrablecerPassword= `


`;

module.exports= {verificarRegistro, restrablecerPassword };