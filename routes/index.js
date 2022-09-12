import express from "express";
import { signUp, login, getUsers } from "../controllers/users/UserController.js";
import { createProduct, getProduct, getProducts, getInventory } from "../controllers/products/ProductController.js";

import { authProtect } from "../controllers/authController.js";
import { hasPermission } from "../middlewares/permissionMiddleware.js";
import { userLevelTypes } from "../config/index.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);

router.post(
    "/create-product",
    authProtect,
    hasPermission([userLevelTypes.admin, userLevelTypes.seller]),
    createProduct
);
router.get("/get-product/:sku", authProtect, getProduct);
router.get("/get-products", authProtect, getProducts);
router.get(
    "/get-inventory",
    authProtect,
    hasPermission([userLevelTypes.admin, userLevelTypes.seller]),
    getInventory
);
router.get(
    "/get-users",
    authProtect,
    hasPermission([userLevelTypes.admin]),
    getUsers
);

export default router;