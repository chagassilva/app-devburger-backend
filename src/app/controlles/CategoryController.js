

import * as Yup from 'yup';
//import Products from '../models/Products';
import Category from '../models/Category';
import User from '../models/User';
//import categories from '../models/categories';
//import User from '../models/User';

class CategoryController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),           
        });
    

    try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: 'Validation fails', messages: err.errors });
        }

        const { name } = req.body;

          if (!req.file) {
    return res.status(400).json({ error: 'Arquivo da categoria (imagem) é obrigatório.' });
  }

        const {filename: path} = req.file

        const {admin: IsAdmin} = await User.findByPk(req.userId)

        if(!IsAdmin){

            return res.status(401).json({ error: 'User is not admin' });

        }
   

    const categoryExists = await Category.findOne({ where: { name } });

    if (categoryExists) {
        return res.status(400).json({ error: 'Category already exists.' });
    }


      
    //     // criando categoria de produtos

         
         const { id } = await Category.create({
    
         name,
         path,
        
             })
    
             return res.status(201).json({id, name});

     // criando categoria de produtos

     
     
         
    
    // fechamento da tag async
    }


    async update(req, res) {
        const schema = Yup.object({
            name: Yup.string(),           
        });
    

    try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: 'Validation fails', messages: err.errors });
        }

        const {admin: IsAdmin} = await User.findByPk(req.userId);

        if(!IsAdmin) {
            return res.status(401).json({ error: 'User is not admin' });
        }

        const {id} = req.params;
        const {name} = req.body

        let path;
    if(req.file) {
        path = req.file.filename;
    }

        // Validação se nome da categoria existe

    if(name) { 
    const categoryNameExists = await Category.findOne({ where: { name } });

        if (categoryNameExists) {
            return res.status(400).json({ error: 'Category already exists.' });
        }
    }
      // Validação se nome da categoria existe

        await Category.update(
          
        {name, path},
        { where: {id} }

        )

        return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    }



    // listagem de categorias

    async index(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }

    // listagem de categorias

    }


export default new CategoryController();


//     // Verifica se o usuario é admin
    
//     const {admin: isAdmin} = await User.findByPk(req.userId);
    
//     if(!isAdmin) {
//         return res.status(401).json({ error: 'User is not admin' });
//     }

//     // Verifica se o usuario é admin

//     const {id} = req.params;

//     // Validação se categoria existe
//     const categoryExists = await Category.findByPk(id);
    
//     if(!categoryExists) {
//         return res.status(400).json({ error: 'Category already exists.' });
//     }
//     // Validação se categoria existe
    
//     let path;
//     if(req.file) {
//         path = req.file.filename;
//     }
 
//     const { name } = req.body;

// // Validação se nome da categoria existe
//     if(name) { 
//     const categoryNameExists = await Category.findOne({ where: { name } });

//         if (categoryNameExists) {
//             return res.status(400).json({ error: 'Category already exists.' });
//         }
//     }
//      // Validação se nome da categoria existe


// // atualizando categoria de produtos
//      await Category.update(
        
//        {
//         name,
//         path,
//        },
       
//        {
//         where: { id },
//        }
//     );

    
//       return res.status(200).json();

//         }