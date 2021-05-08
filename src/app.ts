import express from 'express';
import routes from './routes/routes';
import cors from 'cors';

const app = express();
const port = 4000;
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());
app.use(routes);



app.listen(port ,'127.0.0.1',() =>{
    console.log(`App is running on port ${port}`)
});



