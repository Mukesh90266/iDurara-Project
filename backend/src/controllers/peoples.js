const { peoplesSchema } = require('../validation/peoples');
const Peoples = require('../models/Peoples');

const createPeoples = async (req, res) => {
    try {
       
        const parsedBody = peoplesSchema.safeParse(req.body);
           
        if (!parsedBody.success) {

            return res.status(400).json({
                success: false,
                message: "Invalid Data",
                errors: parsedBody.error.errors, 
            });
        }

       
        const { firstName, lastName, company, country, phone, email } = parsedBody.data;

       
        const isExists = await Peoples.findOne({ email });
        
        if (isExists) {  
                                
            return res.status(409).json({        
                success: false,
                message: "Person already exists",
            });
        }

        
        const payload = { firstName, lastName, company, country, phone, email, userId: req.userId };
        const newPeople = await Peoples.create(payload);  

         
         
        return res.status(201).json({         
            success: true,
            data: newPeople,
            message:"New People added successfully"
        });

    } catch (error) {
        
        console.error(error);
        return res.status(500).json({            
            success: false,
            message: "Failed to create new People",
        });
    }
};

    const getPeoples = async(req,res) =>{
        try{
            const allPeoples = await Peoples.find({userId: req.userId});
            res.status(200).json({
                success:true,
                message:"Data fetched successfully",
                data:allPeoples,
            })
            
        }catch(error){
console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get people data",
    });
  }
};
    
module.exports = { createPeoples, getPeoples };

