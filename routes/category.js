const router = require("express").Router();
const {
    createCategory, getAllParentCat, createSubCategory, getAllSubCat, getParentCatByName, getParentCatById, deleteSubCat, getSubCatById, getSubCatByName, updateCategory
} = require('../db/category')

// Create Routes 
// Parent Category
router.post("/category/create", async (req, res) => {
    const { name } = req.body
    if (name != '' && name != null) {
        try {
            await createCategory(name)
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

// Sub Category 
router.post("/subcategory/create", async (req, res) => {
    const { name, parent_category_id, description, image_url } = req.body
    if (name != '' && name != null) {
        try {
            await createSubCategory(name, parent_category_id, description, image_url)
            res.json({
                status: 1,
                message: "Sub Category added successfully."
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
// Parent Category By ID
router.get("/category/:catId", async (req, res) => {
    const { catId } = req.params
    if (catId != null && !isNaN(catId)) {
        try {
            const result = await getParentCatById(catId)
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

// Sub Category By ID
router.get("/subcategory/:catId", async (req, res) => {
    const { catId } = req.params
    if (catId != null && !isNaN(catId)) {
        try {
            const result = await getSubCatById(catId)
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

// Parent Category Search
router.get("/category/search/:catName", async (req, res) => {
    const { catName } = req.params
    if (catName != null && catName != '') {
        try {
            const result = await getParentCatByName(catName)
            if (result.length <= 0) {
                res.status(404).json({
                    error: 1,
                    message: "Resource not found!"
                })
            } else {
                res.json({
                    status: 1,
                    data: result
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

// Sub Category Search
router.get("/subcategory/search/:catName", async (req, res) => {
    const { catName } = req.params
    if (catName != null && catName != '') {
        try {
            const result = await getSubCatByName(catName)
            if (result.length <= 0) {
                res.status(404).json({
                    error: 1,
                    message: "Resource not found!"
                })
            } else {
                res.json({
                    status: 1,
                    data: result
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
// Sub Category
router.delete("/subcategory/:catId", async (req, res) => {
    const { catId } = req.params
    if (catId != null && !isNaN(catId)) {
        try {
            const result = await deleteSubCat(catId)
            if (result.affectedRows <= 0) {
                res.status(404).json({
                    error: 1,
                    message: "Resource not found!"
                })
            } else {
                res.json({
                    status: 1,
                    message: "Sub-Category deleted successfully!"
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
            message: "Invalid Category Id!"
        })
    }
});

// update routes
router.put("/category/:catId", async (req, res) => {
    const { catId } = req.params
    const { name } = req.body
    if (catId != null && !isNaN(catId)) {
        if (name != '' && name != null) {
            try {
                const result = await updateCategory(catId, name)
                if (result.affectedRows <= 0) {
                    res.status(404).json({
                        error: 1,
                        message: "Resource not found!"
                    })
                } else {
                    res.json({
                        status: 1,
                        message: "Category updated successfully."
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
//  Parent Categories 
router.get("/categories", async (req, res) => {
    try {
        const result = await getAllParentCat()
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
// subcategories
router.get("/subcategories", async (req, res) => {
    try {
        const result = await getAllSubCat()
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
