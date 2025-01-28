import mysql from 'mysql2/promise';
import {config} from 'dotenv';
config()

const pool = await mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

 const getusers = async ()=>{
    const [data] = await pool.query('SELECT * FROM users');
    return data;
 }
console.log(await getusers())

const getProducts= async()=>{
    const [data]=await pool.query('SELECT * FROM products');
    return data;
 }
console.log(await getProducts());

const deleteProduct = async (product_code)=>{
    const [data] = await pool.query('DELETE FROM products WHERE product_code = ?', [product_code]);
    return data;
}
console.log(await deleteProduct('baro1'));

const addProduct = async (product_name,product_code,product_price,product_quantity)=>{
    const [data] = await pool.query('INSERT INTO products (product_name,product_code,product_price,product_quantity) VALUES (?,?,?,?)', [product_name,product_code,product_price,product_quantity]);
    return data; 
}
console.log(await addProduct('Cadbury','cad1',16.50,5));

const updateProduct = async (product_code,product_quantity)=>{
    const [data] = await pool.query('UPDATE products SET product_quantity = ? WHERE product_code = ?', [product_code,product_quantity]);
    return data;
}
console.log(await updateProduct(9,'coke1'));

