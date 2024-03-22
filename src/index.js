import express from 'express'

import morgan from 'morgan';
import {engine} from 'express-handlebars'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url';

//inicializar
const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));

//configuraciones
app.set('port',process.env.PORT || 3000);
        //configurar carpeta para las vistas
app.set('views', join(__dirname,'views'))
        //configurar el motor de plantillas
app.engine('.hbs',engine({
    defaultLayout:'main',
    layoutsDir:join(app.get('views'), 'layouts'),
    partialsDir:join(app.get('views'), 'partials'),
    extname: 'hbs'
    }));
    app.set('view engine','.hbs');
    //
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json())
//Rutas
app.get('/',(req,res)=>{
    //res.json({"mensaje":"hola mundo"})
    res.render('index')
})

//Archivos públicos
app.use(express.static(join(__dirname, 'public')));


//Ejecutar servidor
app.listen(app.get('port'),()=>
    console.log("cargando el puerto",app.get('port'))
);
