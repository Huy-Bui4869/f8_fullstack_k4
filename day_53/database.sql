-- Table: public.products
CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name_product character varying(100) COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    total_price integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    customer_id integer,
    CONSTRAINT product_id_primary PRIMARY KEY (id),
    CONSTRAINT product_id_unique UNIQUE (id),
    CONSTRAINT products_customer_id_foreign FOREIGN KEY (customer_id)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

-- Table: public.customers
CREATE TABLE IF NOT EXISTS public.customers
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    status boolean,
    CONSTRAINT customer_id_primary PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE IF EXISTS public.customers
    OWNER to postgres;


-- Thêm dữ liệu cho table customers
INSERT INTO customers(name, email, phone, status)
VALUES('nguyen van a', 'user1@gmail.com', 0234857365, true),
('nguyen van b', 'user2@gmail.com', 0364853321, false),
('nguyen van c', 'user3@gmail.com', 0582346379, false);

--Thêm dữ liệu cho table products
INSERT INTO products(name_product, quantity, price, customer_id)
VALUES('san pham 1', 10, 2000, 1),
('san pham 2', 7, 3000, 1),
('san pham 3', 5, 4000, 1),
('san pham 4', 22, 5000, 2),
('san pham 2', 8, 5000, 2),
('san pham 5', 6, 5000, 3),
('san pham 1', 2, 5000, 3);


-- Xem danh sách đơn hàng
SELECT customers.name, customers.email, customers.phone, customers.status, customers.updated_at,
SUM(products.quantity) AS total_product, 
SUM(products.quantity * products.price) AS totals_price
FROM customers
INNER JOIN products
ON customers.id = products.customer_id
GROUP BY customers.id;


-- Xem chi tiết đơn hàng
SELECT customers.*,
products.name_product AS name_product, 
products.price AS price_product,
products.quantity AS quantity,
SUM(products.quantity * products.price) AS total_price
FROM customers
INNER JOIN products
ON customers.id = products.customer_id
GROUP BY customers.id, products.name_product, products.price, products.quantity;