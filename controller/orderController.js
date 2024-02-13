const connection = require('../db');

module.exports = {
    getAllOrder: async (req, res) => {
        try {
            const sql = "SELECT * FROM orders"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            res.status(200).json({
                message: "success to get data", 
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    },
    getOrderById: async (req, res) => {
        try {
            const id = req.params.id;
            const sql = "SELECT * FROM orders WHERE order_id = ?"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            });
            if (data.length === 0) {
                return res.status(404).json({
                    message: "Data not found for the given ID", 
                    data: data
                })
            }
            return res.status(200).json({
                message: "success to get order by id", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    },
    addOrder: async (req, res) => {
        try {
            const {user_id, product_name, order_date} = req.body; 
            const sql = "INSERT INTO orders (user_id, product_name, order_date) VALUES (?, ?, ?)"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [user_id, product_name, order_date], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to add order",
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    updateOrder: async (req, res) => {
        try {
            const {user_id, product_name, order_date} = req.body; 
            const id = req.params.id; 
            const sql = "UPDATE orders SET user_id = ?, product_name = ?, order_date = ? WHERE order_id = ?"; 
    
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [user_id, product_name, order_date, id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "succes to update data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    deleteOrder: async (req, res) => {
        try {
            const id = req.params.id; 
            const sql = "DELETE FROM orders WHERE order_id = ?";
    
            const data = await new Promise((resolve, reject) => {
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
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server erro", 
                status: error
            })
        }
    }
}