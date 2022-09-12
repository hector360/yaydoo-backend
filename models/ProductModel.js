import mongoose from "mongoose";

const productModelSchema = mongoose.Schema({
        nombre: {
            type: String,
            require: true,
        },
        sku: {
            type: String,
            require: true,
            unique: true,
        },
        cantidad: {
            type: Number,
            require: true,
        },
        precio: {
            type: Number,
            require: true,
        },
        user_id: {
            type: String,
            require: true,
        }
        
    },
    {
        timestamps: true,
    }
);

const ProductModel = mongoose.model("ProductModel", productModelSchema);
export default ProductModel;