const order = require('../models/order')

module.exports = {
    obtainAll: async (req, res)=>{
        try {
            const dataOrder = await order.find()
            return res.status(200).json({
                "status": true,
                "dataOrder": dataOrder,
            })
        } catch (error) {
            return res.status(500).json({
                "status": false,
                "error": error
            })
        }
    }
}

