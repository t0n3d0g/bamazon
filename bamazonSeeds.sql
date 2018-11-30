DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES  ("The White Album", "Music", 29.95, 50),
        ("OP-Z", "Instruments", 699.95, 3),
        ("Willie Nelson: An Epic Life", "Books", 24.95, 85),
        ("PO-35 Speak", "Instruments", 59.95, 13),
        ("PO-33 KO", "Instruments", 59.95, 13),
        ("PO-32 Tonic", "Instruments", 59.95, 13),
        ("PO-28 Robot", "Instruments", 59.95, 13),
        ("PO-24 Office", "Instruments", 59.95, 13),
        ("PO-20 Arcade", "Instruments", 59.95, 13),
        ("PO-16 Factory", "Instruments", 59.95, 13);
        