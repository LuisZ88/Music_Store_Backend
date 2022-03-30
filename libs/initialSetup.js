const Role = require("../models/Role");
const Category = require("../models/Category")


const createRoles = async () => {
    try {
        const countCategory = await Category.estimatedDocumentCount();
        const count = await Role.estimatedDocumentCount();
        if (count === 0) {
        const values = await Promise.all([
          new Role({name:'client'}).save(),
          new Role({name:'admin'}).save(),
        ]);}
        if (countCategory > 0) return;
        const cats = await Promise.all([
          new Category({title:'bajo', product_id:[]}).save(),
          new Category({title:'teclado', product_id:[]}).save(),
          new Category({title:'percusion', product_id:[]}).save(),
          new Category({title:'guitarra', product_id:[]}).save(),
          new Category({title:'viento', product_id:[]}).save(),
        ]);

    } catch (error) {
        console.log(error)
        
    }
   
}

module.exports = createRoles;

