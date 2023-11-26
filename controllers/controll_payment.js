const stripe = require('stripe')('clave secreta')

module.exports ={
    processPayment: async (req, res)=>{
        try{
            const {token, amount, currency, description}= req.body
           // console.log(token, amount, currency, description);
            const amountPenny = amount*10

            const source = await stripe.sources.create({
                type: 'card',
                token,
            });

            const charge = await stripe.paymentIntents.create({
                source: source.id,
                amount,
                currency, 
                description,
                
            })
            return res.status(200).json({
                "status": true,
                "charge": charge
            })
        }catch(error){
            return res.status(500).json({
                "status": false,
                "error": error.message
            })
        }
    }
}