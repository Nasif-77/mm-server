const joi = require('joi')


module.exports={
     validateSchema: (schema) => {
        const validator = (payload) => schema.validate(payload, { abortEarly: false });
      
        return (req, res, next) => {
          const { error } = validator(req.body);
          if (error) {
            return res.status(400).json({ error: error.message });
          }
          next(); 
        };
      }
}