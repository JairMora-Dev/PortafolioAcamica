-- MySQL defaults values to Sprint2
USE DelilahS2_DB;

ALTER TABLE products CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE products CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO products ( productName, price )
VALUES ( 'Sandwich Veggie', 190 );

INSERT INTO products ( productName, price )
VALUES ( 'Ensalada Veggie', 140 );

INSERT INTO products ( productName, price )
VALUES ( 'Lomo de Salmon', 500 );

INSERT INTO products ( productName, price )
VALUES ( 'Corte Wagyu', 3500 );

INSERT INTO products ( productName, price )
VALUES ( 'Papas a la francesa', 240 );

INSERT INTO products ( productName, price )
VALUES ( 'Hamburguesa doble Queso', 290 );

INSERT INTO products ( productName, price )
VALUES ( 'Limonada', 50 );

INSERT INTO products ( productName, price )
VALUES ( 'Copa de vino', 80 );

INSERT INTO products ( productName, price )
VALUES ( 'Agua Mineral', 40 );



