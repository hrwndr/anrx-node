CREATE DATABASE anrx;

USE anrx;

CREATE TABLE `Category`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE `Categories`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_category_id INT,
    name VARCHAR(255),
    description VARCHAR(255),
    image_url TEXT,
    slug VARCHAR(255),
    FOREIGN KEY (parent_category_id) REFERENCES Category(id)
);

CREATE TABLE `Products`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    sku VARCHAR(255),
    name VARCHAR(255),
    price VARCHAR(255),
    slug VARCHAR(255)
);

CREATE TABLE `product_categories`(
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES Products(id),
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

CREATE TABLE `product_images`(
    product_id INT,
    image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);