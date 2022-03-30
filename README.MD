
# Musicalia is React and Node.js  project based eCommerce platform.

A responsive musical instrument store built from the beggining.
The tools I have used:
- NodeJs
- MongoDb
- Cloudinary for upload images
- Expressjs
- Mongoose
- Jsonwebtoken

<a href="https://git-scm.com/" target="_blank"> <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="Git" width="40" height="40"/> </a>
<a href="https://github.com/" target="_blank"> <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="40" height="40"/> </a>
<a href="https://www.heroku.com/" target="_blank"> <img src="https://brand.heroku.com/static/media/heroku-logo-stroke-gradient.bb410472.svg" alt="Heroku" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/245px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript" width="40" height="40"/> </a>
<a href="https://www.mongodb.com/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="40" height="40"/> </a>
<a href="https://nodejs.org/" target="_blank"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/> </a>
<a href="https://www.postman.com/" target="_blank"> <img src="https://symbols.getvecta.com/stencil_92/21_postman-icon.c79f00c910.svg" alt="Postman" width="40" height="40"/> </a>
<a href="https://code.visualstudio.com/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png" alt="Visual Studio Code" width="40" height="40"/> </a>




## Installation:
***
1. `$ git clone https://github.com/LuisZ88/Music_Store_Backend.git`
2. `npm i`
3. `npm start`
4. `Frontend link`  https://github.com/LuisZ88/Music_Store

### Add variables
.env needs the following data:

- `MONGODB_URL` Your database information.
- `SALT` Number for BCrypt
- `SECRET` Word for json web token
- `CLOUDINARY_CLOUD_NAME` Your data from cloudinary site
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
# Store

Single-Page Application with React server-side rendering.

[Online Demo Store](https://musicalia-store.herokuapp.com/)
***
***
# Extra info


# Controladores

Aquí declaramos todos los métodos.

## auth.controller

---

Tenemos el objeto userCtrl, con los siguientes métodos:



1. signUp: Sirve para registrar un nuevo usuario. Requiere por el body estos parámetros {name, surname, email, password, adress, roles}. Roles si no se introduce por el body sale predefinido como client. Cuando se crea genera un JWT para poder realizar unas acciones u otras.
2. updateUser: Sirve para actualizar datos del usuario. Require por el body estos parámetros {password, adresss, newPassword}, y por params el id del usuario. Si el password no es correcto, no se puede cambiar ninguno de los datos.
3. deleteUser: Sirve para borrar el usuario. Require la id del usuario por Params.
4. getAllUsers: Sirve para mostrar todos los usuarios de la base de datos.
5. getUserById: Sirve para encontrar un usuario específico. Require la id del user por params
6. login: Sirve para iniciar sesión. Requiere por body {email, password}. Cuando se envía devuelve un JWT

## product.controller

---
Tenemos el objeto productCtrl con los siguientes métodos:


1. createProduct: Sirve para crear un nuevo producto. Require por el body {name,subCat,trademark,price,picture,description,category,special,stock,}. Al introducir la categoría, busca el array de esa categoría y mete la id del nuevo producto.
2. getAllCategory: Muestra todos los productos por categoría. Require el id de categoría por params.
3. deleteProductById: Sirve para borrar un producto. Requiere la id por paramss.
4. updateProductById: Sirve para actualizar un producto. Requiere la id del producto por params y por el body {price, stock}
5. getAllProduct: Sirve para mostrar todos los productos
6. getProductById: Sirve para ver un producto en concreto. Requeire la id del producto por params


## upload.controller
---
Tenemos el objteo imgCtrl con los siguientes métodos:



1. upload: utiliza la dependencia de cloudinary, para subir una imagen a la nube y devover un enlace. En el proceso crea un archivo temporal mediante la dependencia express-fileupload, y cuando la ga subido la borra.
2. deleteImg: borra de cloudinary la imagen. 

# Routes

Aquí llamamos los diferentes métodos

---
## AuthRoutes
1. router.post("/signUp", userCtrl.signUp);
2. router.post("/login", userCtrl.login); 
3. router.put("/updateUser/:id", userCtrl.updateUser);
4. router.delete("/deleteUser/:id", userCtrl.deleteUser);
5. router.get("/allUser/",[auth.verifyToken, auth.isAdmin], userCtrl.getAllUser); 
Requiere tener token y ser administrador
6. router.get("/getUser/:id",[auth.verifyToken, auth.isAdmin], userCtrl. getUserById); 
Requiere tener token y ser administrador

## ProductRoutes

---
1. router.post('/product', [auth.verifyToken, auth.isAdmin], productCtrl.createProduct) Requiere tener token y ser administrador

2. router.get('/category/:id', productCtrl.getAllCategory)
3. router.delete('/product/:id',[auth.verifyToken, auth.isAdmin], productCtrl.deleteProductById) Requiere tener token y ser administrador

4. router.put('/product/:id',[auth.verifyToken, auth.isAdmin], productCtrl.updateProductByID) Requiere tener token y ser administrador

5. router.get("/product", productCtrl.getAllProduct)
6. router.get("/product/:id", productCtrl.getProductById)

## UploadRoutes
---
1. router.post('/upload', [auth.verifyToken, auth.isAdmin], upload.upload) Requiere tener token y ser administrador
2. router.post('/deleteImg', [auth.verifyToken, auth.isAdmin],upload.deleteImg) Requiere tener token y ser administrador


# InitialSetup

La primera vez que  se inicia la base de datos comprueba si existen las categorías predefinidas y los roles de usuario. Si no existen los crea nuevos.

