const con = require('./conn')

const createSlug = name => {
    return name.replace(" ", "-")
}

const createCategory = (name) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `Category`(name) VALUES('" + name + "')";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const createSubCategory = (name, parent_category_id, description, image_url) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `Categories`(parent_category_id, name, description, image_url, slug) VALUES(" + parent_category_id + ", '" + name + "', '" + description + "', '" + image_url + "', '" + createSlug(name) + "')";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}


const getParentCatById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Category` WHERE id='" + id + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}
const getParentCatByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Category` WHERE name LIKE '%" + name + "%'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const getSubCatById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Categories` WHERE id='" + id + "'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}
const getSubCatByName = (name) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Categories` WHERE name LIKE '%" + name + "%'";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const updateCategory = (id, name) => {
    if (id != '' && !isNaN(id) && name != '' && name != null) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE `Category` SET name='" + name + "' WHERE id=" + id;
            con.query(sql, function (err, result) {
                if (err) reject(err);
                resolve(result)
            });
        })
    }
}

const deleteSubCat = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `Categories` WHERE id=" + id;

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

const getAllSubCat = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Categories`";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}
const getAllParentCat = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `Category`";

        con.query(sql, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    })
}

module.exports = { createCategory, getAllParentCat, createSubCategory, getParentCatByName, getParentCatById, getAllSubCat, deleteSubCat, getSubCatById, getSubCatByName, updateCategory }