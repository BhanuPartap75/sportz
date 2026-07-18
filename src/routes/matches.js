import { Router } from "express";
import { createMatchSchema } from "../validation/matches";

export const matchRouter=Router();

matchRouter.get('/',(req,res)=>{
  res.status(200).json({message:'Matches List'});
})

matchRouter.post('/',(req,res)=>{
  const parsed=createMatchSchema.safeParse(req.body);
  if(!parsed.success){
     return res.status(400).json({err:'Inavlid payload',deatils:JSON.stringify(parsed.error)})
  }
 
   try{
      
   }catch(e){
    res.status(500).json({error:'Failed to create match',details:JSON})
   }

})