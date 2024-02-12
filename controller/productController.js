const connection = require('../db');

module.exports = {
    getAllProduct: async (req, res) => {
        try {
            const sql = "SELECT * FROM products"; 

            const result = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to get data", 
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    },
    getProductById: async (req, res) => {
        try {
            const id = req.params.id;
            const sql = "SELECT * FROM products WHERE product_id = ?";

            const result = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to get data by id",
                data: result
            })
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    message: "internal server error", 
                    status: error
                })
            }
        }
    },
    addProduct: async (req, res) => {
        try {
            const {product_name, price} = req.body;
            const sql = "INSERT INTO products (product_name, price) VALUES (?, ?)";

            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [product_name, price], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to add data", 
                data: result
            })
        } catch (error) {
            if (error) {
                return res.status(500).json({
                    message: "internal server error", 
                    status: error
                })
            }
        }
    }, 
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id; 
            const {product_name, price} = req.body;
            const sql = "UPDATE products SET product_name = ?, price = ? WHERE product_id = ?"; 

            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [product_name, price, id], (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                })
            })
            return res.status(200).json({
                message: "sucess to update data", 
                data: result
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const sql = "DELETE FROM products WHERE product_id = ?"; 

            const result = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to delete data", 
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }
}
