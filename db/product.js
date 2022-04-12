const con = require('./conn')

const createSlug = name => {
    return name.replace(" ", "-")
}

const createProduct = (name, sku, price) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `Products`(name, sku, price, slug) VALUES('" + name + "','" + sku + "', '" + price + "', '" + createSlug(name) + "')";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Products` WHERE id=" + id;

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `Products` WHERE id=" + id;

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const updateProduct = (id, data = {}) => {
    if (id != '' && !isNaN(id) && data != {}) {
        const { name, sku, price } = data
        return new Promise((resolve, reject) => {
            const sql = "UPDATE `Products` SET name='" + name + "', sku='" + sku + "', price='" + price + "', slug='" + createSlug(name) + "'";
            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(result)
            });
        })
    }
}

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Products`";
        con.query(sql, function (err, result) {
            if (err) reject(err);
        });
    })
}

const getAllUniqueCategories = (name, email, password) => {
    const sql = "INSERT INTO `users`(name, email, password) VALUES('" + name + "','" + email + "', '" + password + "')";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User added!!");
    });
}

const addImageToProduct = (id, image_url) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `product_images`(product_id, image_url) VALUES(" + id + ", '" + image_url + "')";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const addCatToProduct = (pid, cid) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `product_categories`(product_id, category_id) VALUES(" + pid + ", " + cid + ")";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

module.exports = { createProduct, getProduct, deleteProduct, getAllProducts, updateProduct, addImageToProduct, addCatToProduct }