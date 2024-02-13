const connection = require('../db');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const sql = "SELECT * FROM users";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "succes to get users data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    getUsersById: async (req, res) => {
        try {
            const id = req.params.id; 
            const sql = "SELECT * FROM users WHERE user_id = ?"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            if (data.length === 0) {
                return res.status(404).json({
                    message: "Data not found for the given ID", 
                    data: data
                });
            }
            return res.status(200).json({
                message: "success to get user data by id",
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    },
    addData: async (req, res) => {
        try {
            const {username, email} = req.body; 
            const sql = "INSERT INTO users (username, email) VALUES (?, ?)";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, email], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to add data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    updateData: async (req, res) => {
        try {
            const id = req.params.id; 
            const {username, email} = req.body; 
            const sql = "UPDATE users SET username = ?, email = ? WHERE user_id = ?";

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, email, id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })
            return res.status(200).json({
                message: "success to update data", 
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: "internal server error", 
                status: error
            })
        }
    }, 
    deleteData: async (req, res) => {
        try {
            const id = req.params.id; 
            const sql = "DELETE FROM users WHERE user_id = ?"; 

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
                message: "internal server error", 
                status: error
            })
        }
    }
}
