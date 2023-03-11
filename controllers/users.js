'use strict'

const { findByIdAndUpdate } = require('../models/users');
const Users= require('../models/users');
const { tokenSing, verifyToken, tokenCorreoConfirmation } = require('../utils/handleJswt');
const {encrypt, compare }= require('../utils/handlePassword');
//requerido para generar un codigo deconfirmacion
const { v4: uuidv4 } = require('uuid')
const {sendEmail, getTemplate, templateResetPassword}= require('../config/email.config');
const {verificarRegistro}= require('../template/verificarRegistro');
const {TemplateResetPassword}= require('../template/resetPassword');
var moment = require('moment');

var controller={
    test: (req,res)=>{
        return res.status(200).send({message: 'hola soy users'});
    },

    singUp: async (req,res)=>{
        let user= new Users();
        let params= req.body;
        let email= req.body.email;
        let name= req.body.name;
      //encryptando el password recibido
      let consHast= await encrypt(params.password);
     //buscar el email para saber si existe
      let busquedaEmail= await Users.findOne({email: email}).select('email') ;
    //comprobando si el email existe
      if(busquedaEmail){
        return res.send({
            message:'correo en uso'
        })
      }
    
      //Generar codigode confirmacion
      const code= uuidv4();

      //generar token
      const tokenCorreo= await tokenCorreoConfirmation({email,code});
     

      
      //obtener un template
      //const Template= getTemplate(name,tokenCorreo);
      const template= verificarRegistro(name,tokenCorreo)
      
      //enviar email
      const sendemail= sendEmail(email,'Verificar registro',template);
    
      //Generando fecha con momen js
      let fecha= moment().format('MM DD YYYY');
       user.fecha= fecha;
       
     

        user.name= params.name;
        user.apellido= params.apellido;
        user.password= consHast;
        user.email= params.email;
        user.code=code;
      //creando nuevo usuario
        user.save( async (err, userStored)=>{
             if(err) return res.status(500).send({message:'error al guardar los datos'});

             if (!userStored) return res.status(404).send({message:'No se ha popido guardar el documento'});
        
             // setear la propiedad password para que no la devuelva
             let token= await tokenSing(userStored) 
             let data={token,user}
             userStored.set("password", undefined,{strict: false});
             return res.status(200).send({data});

            });




    },

    getUser: (req, res)=>{
        let id=req.params.id;

        Users.findById(id,(err,user)=>{
            if(err) return res.status(500).send({message:'Error al devolver el usuario'});

            if(!user) return res.status(404).send({message:'El proyecto no existe'});
          //setear password
          user.set('password', undefined, {stric: false});
            return res.status(200).send({
                user: user
            });
        })


    },

    updateUser: (req,res)=>{
           
        let id=req.params.id;
        //let update= req.body;
        let name=req.body.name;
        let apellido= req.body.apellido;
        let email= req.body.email;

        Users.findByIdAndUpdate(id,{name:name, apellido:apellido, email:email} ,{new:true},(err,userUpdate)=>{

            if(err) return res.status(500).send({message:'Error al actualizar'});
             
            if(!userUpdate) return res.status(404).send({message:'no existe el proyecto para actualizar'});
             //setear password
             userUpdate.set('password', undefined, {stric: false});
            return res.status(200).send({
                user: userUpdate
            });
       
        })
    },
 

    singIn: async (req, res)=>{

        let email= req.params.email;
        let password= req.params.password;

       
       try {
        let user= await Users.findOne({email:email}).select('password name email _id');

        if(!user){
            return res.status(404).send({message:'Email no existe'});


        }
        const hashPassword= user.password;
        const check = await compare(password,hashPassword);

        if(!check){
            return res.status(401).send({message:'Datos invalidos'});

        }

        var token= await tokenSing(user);

        return res.status(200).send({
                                    token: token,                    
                                    user: user})




      
       } catch (error) {
        
       }

    },

    cambiarPassword: async (req, res)=>{
        let id= req.params.id;
        let password= req.body.password;
        let newPassword= req.body.newPassword;

        const busqueda= await Users.findById(id).select('password');
        
        if(busqueda){
            let hashPassword= busqueda.password;

            let check= await compare(password,hashPassword);

            if(!check){
                return res.status(404).send({message:'contrasena actual incorrecta'});

            }
            let consHast= await encrypt(newPassword);



            let actualizandoPassword= await Users.findByIdAndUpdate(id,{password:consHast});

            return res.status(200).send({password:'contrasena actualizada'});

        }

        return res.send({message:'contrasena invalida'})

        

       

         




    },
  //confirmar el email
    confirmaEmail: async(req, res)=>{

        let token= req.params.token
        
        //verificando si el token es valido
        var verifytoken= await verifyToken(token);
        
        
       //comprobando si existe la propiedad data
        if(!verifytoken.data){
            return res.status(404).send({message:' error al confirmar email'});
        }
        // guardandoel email en una variable
        var email= verifytoken.data.email
        

        //lo que se va a actualizar
         const updateStatus={status:'verificado'}

         //buscando el user para actualizar
         const updates= await Users.findOneAndUpdate({email:email},updateStatus, {new:true});

         if(!updates) return res.send({message:"error"})

         return res.status(200).send({updates})


        

    },
  //enviar correo cuando la password se ha olvidado
    sendEmailPass: async (req, res)=>{
        let email= req.params.email;
        
        //buscando al usuario por el email
        let buscaEmail= await Users.findOne({email:email});
        
        //comprobando si existe el email
        if(!buscaEmail){
            return res.status(200).send({noExiste:'Email no encontrado' });
        }

        //guardando el code que tiene el usuario
        let code= buscaEmail.code;
        let name= buscaEmail.name;

        let payload={email:email, code:code};

        //generando un token

        let tokenP=await tokenCorreoConfirmation(payload);
        
        //guardando token generado para confirmar elemail
        let guardandoToken= await  Users.findOneAndUpdate({email:email},{tokenConfirResePassword:tokenP},{new:true});


        if (guardandoToken){
            //creando template
            let template= TemplateResetPassword(name,tokenP);

            //enviar email
            let sendemail=  sendEmail(email,'Restrablecer password',template);

            return res.status(200).send({message:'revise su correo por favor'})
        }
       
        return res.send({message:'Error'});


    },

    resetPassword: async (req,res)=>{
         
        let token= req.params.token;
        let newPassword= req.body.newpassword;
        
        //verificando el token
        let verificartoken= await verifyToken(token);
       // console.log(verificartoken);

        //comprobar si el tokenes invalido
        if(!verificartoken.data){
            return res.status(404).send({message:'link invalido'})
        }
        if(!verificartoken){
            return res.status(404).send({message:'Error'})
        }
        //buscando el token recibido en el usuario
       let buscandoToken= await Users.findOne({tokenConfirResePassword:token});
        
       //comprobando si se encontro eltoken
       if(!buscandoToken){
            sendEmail.status(404).send({message:'error link'})
       }

       //guardando el email que estaba en el token
        let email=verificartoken.data.email;

        //generando hash a la nueva contrasena
        let passwordHas= await encrypt(newPassword);

        //propiedad a actualizar
        let update= {password:passwordHas, tokenConfirResePassword:''};

        //buscando al usuario pora actualizar password
        
        let buscarUser= await Users.findOneAndUpdate(email,update,{new:true});
          

        return res.status(200).send({message:'password cambiada'});

       

    },
    //verificar si es valido el link para resetear password
    verificarLinkResetPassword: async(req,res)=>{

        let token= req.params.token;
        //verificando si el token es valido
        let verifcarToken= await verifyToken(token);

        console.log(verifcarToken)
       
        if(!verifcarToken.data){
            return res.status(404).send({message:'Link invalido'});
        }

        //buscar el token en el usuario
        let tokenBuscando= await Users.findOne({tokenConfirResePassword:token});
         
        if(!tokenBuscando){
            return res.send({message:'errortoken'})
        }


        return res.status(200).send({autorizado:'Link valido'});
    }

    
}

module.exports= controller;