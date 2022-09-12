
import ProductModel from '../../models/ProductModel.js';
import { userLevelTypes } from "../../config/index.js";

export const createProduct = async (req, res) => {
    try{
        let nombre = req.body.nombre ? req.body.nombre : "";
        let sku = req.body.sku ? req.body.sku : "";
        let cantidad = req.body.cantidad ? req.body.cantidad : "";
        let precio = req.body.precio ? req.body.precio : "";
        if(nombre === ""){
            return res.status(400).json({error: "the name cannot be empty", section: "nombre"})
        }
        if(sku === ""){
            return res.status(400).json({error: "the sku cannot be empty", section: "sku"})
        }
        if(cantidad === ""){
            return res.status(400).json({error: "the cantidad cannot be empty", section: "cantidad"})
        }
        if(precio === ""){
            return res.status(400).json({error: "the price cannot be empty", section: "precio"})
        }
        let product_exist = await ProductModel.findOne({sku});

        if(product_exist) {
            return res.status(400).json({error: "this product with this sku already exists", section: "sku"});
        }
        let product = await ProductModel.create({
            nombre,
            sku,
            cantidad,
            precio,
            user_id: req.user._id 
        })
        return res.status(200).json({
            message: "product created",
            product
        })
    }catch(error){
        console.log(error)
    }
}

export const getProduct = async (req, res) => {
    try{
        let sku = req.params.sku ? req.params.sku : "";
        
        if(sku === ""){
            return res.status(400).json({error: "please insert the sku"})
        }
        let product = await ProductModel.findOne({sku});

        return res.status(200).json({
            message: "we have found your product",
            product
        })
    }catch(error){
        console.log(error)
    }
}

export const getProducts = async (req, res) => {
    try{
        let products = await ProductModel.find();
        
        return res.status(200).json({
            message: "We have found your products",
            products
        })
    }catch(error){
        console.log(error)
    }
}

export const getInventory = async (req, res) => {
    try{
        let products;
        if(req.user.user_level === userLevelTypes.admin){
            products = await ProductModel.find();
        }else{
            products = await ProductModel.find({user_id: req.user._id});
        }
        
        return res.status(200).json({
            message: "We have found your products",
            products
        })
    }catch(error){
        console.log(error)
    }
}