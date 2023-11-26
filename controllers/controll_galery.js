import galery from "../models/galery.js";
import product from "../models/product.js";
import { uploadImage, deleteImage } from '../utils/cloudinary.js'

export const obtainAll = async (req, res) => {
    try {
        const galerys = await galery.find();
        return res.status(200).json({ galerys });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}


export const saveGalery = async (req, res) => {
 
     console.log(req.body)

     const id = req.body.id;
     console.log("rewr  "+ id);
     
     console.log("imagenes nuevas22: ", req.body.images.secure_url)
    try {
        const newProduct = new galery(req.body);

        if (req.body.secure_url) {

            newProduct.images = {
                public_id: req.body.public_id,
                secure_url: req.body.secure_url
            };

           
        }

        if (req.body.id) {

            newProduct.products = req.body.id;
        }

        const galerys = await galery.findOne({ products: id });
       // console.log("datos de galeria encontrada: ",galerys)
        let datagalerysave;
          if (galerys) {
            console.log("imagenes nuevas: ")
            for (let i=0 ; i < req.body.images.length; i++){
                console.log(req.body.images[i].secure_url);
            galerys.images.push({
              secure_url: req.body.images[i].secure_url,
              public_id: req.body.images[i].public_id
             
            });
            }
            // Guarda la galería actualizada
            datagalerysave = await galerys.save();
            console.log("actualizado");
          } else {
            // No hay galería existente, crea una nueva galería con las imágenes
            datagalerysave = await newProduct.save();
            console.log("nuevo");
          }
          
     

        return res.status(200).json({
            "status": true,
            "dataProduct": datagalerysave
        });
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error.message
        });
    }
};


export const findById = async (req, res) => {
    try {

        const id = req.params.id;
        console.log("rewr  "+ id);
        const galerys = await galery.findOne({ products: id });
    
        if (!galerys) {
          return res.status(404).json({ message: 'No se encontró ninguna galería para el producto especificado' });
        }
    
        return res.status(200).json({ galerys });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
      }
}


export const deleteGalery = async (req, res) => {
    try {
        const publicIdToDelete = req.params.id; // Obtener el public_id a eliminar

        // Buscar una galería que contenga la imagen con el public_id a eliminar
        const galeryDoc = await galery.findOne({ "images.public_id": publicIdToDelete });

        if (!galeryDoc) {
            return res.status(404).json({
                "status": false,
                "message": "Imagen no encontrada"
            });
        }

        // Encontrar la imagen con el public_id a eliminar
        const imageToDelete = galeryDoc.images.find(image => image.public_id === publicIdToDelete);

        if (!imageToDelete) {
            return res.status(404).json({
                "status": false,
                "message": "Imagen no encontrada"
            });
        }
        
        // Eliminar la imagen del array
        galeryDoc.images = galeryDoc.images.filter(image => image.public_id !== publicIdToDelete);
        await galeryDoc.save();

        // Ahora, puedes eliminar la imagen real si lo deseas (usando la función deleteImage)
        await deleteImage(publicIdToDelete)
        return res.status(200).json({
            "status": true,
            "message": "Imagen eliminada con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        });
    }
}



















