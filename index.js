import mysql from 'mysql2/promise';
import express from "express";
import {config} from 'dotenv';
config()
 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`localhost://${port}`)
});

const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
// 2a
app.get('/products', async (req, res) => {
    try {
        const [data] = await pool.query('SELECT * FROM products');
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
});
// 2b
app.get('/products/:product_code', async (req, res) => {
    try {
        const [data] = await pool.query('SELECT * FROM products WHERE product_code = ?', [req.params.product_code]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
});
// 2c
app.post('/products/add', async (req, res) => {
    try {
      const {product_code, product_name, product_price, product_quantity} = req.body;
      await pool.query(
        'INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?, ?, ?, ?)',
        [product_code, product_name, product_price, product_quantity]
      );
      res.json({message: 'Product added'});
    } catch (error) {
      res.json({message: 'Server Error'});
    }
  });

// 2d
app.delete('/products/:product_code', async (req, res) => {
    try {
        const [data] = await pool.query('DELETE FROM products WHERE product_code = ?', [req.params.product_code]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
})
// 2e
app.put('/products/:product_code', async (req, res) => {
    const {product_quantity} = req.body;
    try {
        const [data] = await pool.query('UPDATE products SET product_quantity = ? WHERE product_code = ?', [product_quantity,req.params.product_code]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
})

// 3f
app.get('/users', async (req, res) => {
    try {
        const [data] = await pool.query('SELECT * FROM users');
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
})

// 3g
app.get('/users/:id', async (req, res) => {
    try {
        const [data] = await pool.query('SELECT * FROM users WHERE ID = ?', [req.params.id]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
})

// 3h
app.post('/users/register', async (req, res) => {
    const {email,first_name,Last_name,password} = req.body;
    try {
        const [data] = await pool.query('INSERT INTO users (email,first_name,Last_name,password) VALUES (?,?,?,?)', [email,first_name,Last_name,password]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
})

app.delete('/user/:ID', async (req, res) => {
    try {
        const [data] = await pool.query('DELETE FROM users WHERE ID = ?', [req.params.ID]);
        res.json(data);
    } catch (error) {
        res.json({message: 'Server Error'})
    }
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

