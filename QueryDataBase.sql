/* Query de creación de base de datos */
create database dataactivos;

/* Usar Query Tool sobre DataActivos para crear la tabla **/

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 0
);

INSERT INTO products(name, quantity)
VALUES
('Computador', 10),
('Mouse', 20),
('Teclado', 15);

Select * from products;

SELECT current_database();

/* En caso de que se deba crear nuevamente la BD **/
drop database dataactivos;

