const jwt = require('jsonwebtoken');
const {UserModel}=require("../models/User.model")
const {blacklist}=require("../models/blacklist")

const authenticate = async(req, res, next) => {
 
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
      res.send('please log in again')
    }
    const decodedToken = jwt.verify(token, "masai");
   

    if(decodedToken){
      const { userID } = decodedToken;
      const user = await UserModel.findById({_id:userID});
      try{
      if (!user) {
         res.json({ message: 'Unauthorized' });
      }
      req.user = userID;
      req.role=user.role;
  
      next();
    } catch (error) {
     res.json({ message: 'Unauthorized',err:error.message});
    }
    }
   
}

module.exports = {authenticate}