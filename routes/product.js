const router = require("express").Router();
const {
    createProduct, getProduct, deleteProduct, getAllProducts, updateProduct, addImageToProduct, addCatToProduct
} = require('../db/product')

router.post("/product/create", async (req, res) => {
    const { name, sku, price } = req.body
    if (name != '' && name != null && sku != '' && sku != null && price != '' && price != null) {
        try {
            await createProduct(name, sku, price)
            res.json({
                status: 1,
                message: "Product added successfully."
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: "Unknown Error!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "All fields are required!"
        })
    }
});

// add image to product 
router.post("/product/:productId/image", async (req, res) => {
    const { productId } = req.params
    const { image_url } = req.body
    if (image_url != '' && image_url != null) {
        try {
            await addImageToProduct(productId, image_url)
            res.json({
                status: 1,
                message: "Image added successfully."
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: "Unknown Error!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "All fields are required!"
        })
    }
});

// add category to product 
router.post("/product/:productId/category", async (req, res) => {
    const { productId } = req.params
    const { category_id } = req.body
    if (category_id != null && !isNaN(category_id)) {
        try {
            await addCatToProduct(productId, category_id)
            res.json({
                status: 1,
                message: "Category added successfully."
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: "Unknown Error!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "All fields are required!"
        })
    }
});

// read routes
router.get("/product/:productId", async (req, res) => {
    const { productId } = req.params
    if (productId != null && !isNaN(productId)) {
        try {
            const result = await getProduct(productId)
            if (result.length <= 0) {
                res.status(404).json({
                    error: 1,
                    message: "Resource not found!"
                })
            } else {
                res.json({
                    status: 1,
                    data: result[0]
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: "Unknown Error!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "Invalid Product Id!"
        })
    }
});

// delete routes
router.delete("/product/:productId", async (req, res) => {
    const { productId } = req.params
    if (productId != null && !isNaN(productId)) {
        try {
            const result = await deleteProduct(productId)
            if (result.affectedRows <= 0) {
                res.status(404).json({
                    error: 1,
                    message: "Resource not found!"
                })
            } else {
                res.json({
                    status: 1,
                    message: "Product deleted successfully!"
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                error: 1,
                message: "Unknown Error!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "Invalid Product Id!"
        })
    }
});

// update routes
router.put("/product/:productId", async (req, res) => {
    const { productId } = req.params
    const { name, sku, price } = req.body
    if (productId != null && !isNaN(productId)) {
        if (name != '' && name != null && sku != '' && sku != null && price != '' && price != null) {
            try {
                const result = await updateProduct(productId, req.body)
                if (result.affectedRows <= 0) {
                    res.status(404).json({
                        error: 1,
                        message: "Resource not found!"
                    })
                } else {
                    res.json({
                        status: 1,
                        message: "Product updated successfully."
                    })
                }
            } catch (err) {
                console.log(err)
                res.status(400).json({
                    error: 1,
                    message: "Unknown Error!"
                })
            }
        } else {
            res.status(400).json({
                error: 1,
                message: "All fields are required!"
            })
        }
    } else {
        res.status(400).json({
            error: 1,
            message: "Invalid Product Id!"
        })
    }
});

// listing routes
router.get("/products", async (req, res) => {
    try {
        const result = await getAllProducts()
        res.json({
            status: 1,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            error: 1,
            message: "Unknown Error!"
        })
    }
});

// router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
