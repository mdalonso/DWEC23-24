CREATE DATABASE IF NOT EXISTS empresadb;

USE empresadb;

CREATE TABLE clientes (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombreCliente VARCHAR(45) NOT NULL,
  emailCliente VARCHAR(20) DEFAULT NULL, 
  tlfnoCliente VARCHAR(12) NOT NULL,
  empresaCliente VARCHAR(25) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE clientes;

INSERT INTO clientes values 
  (1, 'Celena Alemán', 'caleman@iestrassierra.com','111111111','Celena S.A.'),
  (2, 'David Bermúdez', 'dbermudez@iestrassierra.com','222222222','David S.L.'),
  (3, 'Dilan Carrillo', 'dcarrillo@iestrassierra.com','333333333','Dilan S.A.');

SELECT * FROM clientes;

CREATE TABLE usuarios (
  usuario VARCHAR(20) NOT NULL,
  contrasena VARCHAR(200) DEFAULT NULL, 
  PRIMARY KEY(usuario)
);
