-- Creación de la base de datos
DROP DATABASE IF EXISTS BDPruebaTecnicaCanopia;
CREATE DATABASE IF NOT EXISTS BDPruebaTecnicaCanopia;
USE BDPruebaTecnicaCanopia;

-- Tabla de categorías (debe crearse primero por las relaciones)
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status TINYINT DEFAULT 1 COMMENT '1 = activo, 0 = inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL COMMENT 'Almacenar hash, no contraseñas en texto plano',
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'user' COMMENT 'admin, user, etc.',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status TINYINT DEFAULT 1 COMMENT '1 = activo, 0 = inactivo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  category_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status TINYINT DEFAULT 1 COMMENT '1 = activo, 0 = inactivo',
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos iniciales para categorías
INSERT INTO categories (name, description) VALUES
('Electrónicos', 'Dispositivos electrónicos y accesorios'),
('Ropa', 'Prendas de vestir para hombre y mujer'),
('Hogar', 'Artículos para el hogar y decoración'),
('Alimentos', 'Productos alimenticios y bebidas');


-- Datos iniciales para productos
INSERT INTO products (name, description, price, stock, category_id) VALUES
('Laptop HP EliteBook', 'Laptop empresarial con procesador i7 y 16GB RAM', 1200.00, 15, 1),
('Smartphone Samsung Galaxy S23', 'Teléfono inteligente con cámara de 108MP', 899.99, 30, 1),
('Camisa de algodón', 'Camisa casual para hombre, 100% algodón', 29.99, 50, 2),
('Juego de sábanas', 'Juego de sábanas de algodón egipcio, tamaño queen', 89.50, 20, 3),
('Café orgánico', 'Café en grano orgánico, paquete de 1kg', 12.75, 100, 4);

-- Creación de índices para mejorar el rendimiento
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);