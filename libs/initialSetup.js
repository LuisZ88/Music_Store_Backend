const Role = require("../models/Role");
const Category = require('../models/Category')

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        const values = await Promise.all([
          new Role({name:'client'}).save(),
          new Role({name:'admin'}).save(),
        ]);
       console.log(values);
    } catch (error) {
        console.log(error)
        
    }
 
}
const createCategory = async ()=>{
    try{
        const count = await Category.estimatedDocumentCount()
        if (count>0) return;
        const values= await Promise.all([
            new Category({title: 'percusion', product_id: []}).save(),
            new Category({title: 'bajo', product_id: []}).save(),
            new Category({title: 'teclado', product_id: []}).save(),
            new Category({title: 'viento', product_id: []}).save(),
            new Category({title: 'guitarra', product_id: []}).save()
        ]);
        console.log(values);
    }catch (error) {
        console.log(error)
        
    }
}
module.exports = createRoles;
module.exports = createCategory;
