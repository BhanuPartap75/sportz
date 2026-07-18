import express from 'express';
import { matchRouter } from './src/routes/matches';
const app=express();

const port=8000;
app.use(express.json());
app.get('/',(req,res)=>{
  res.send("serevr is running");
})

app.use('/matches',matchRouter);
app.listen('port',()=>{
  console.log('server is running');
})