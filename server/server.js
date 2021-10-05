import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import bodyParser from 'body-parser'
import cors from 'cors'




const CONNECTION_URL = 'mongodb+srv://sam:sam@mybusiness.sfgk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 8000;


const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use('/user', userRoutes)


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("in");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

})
.catch(error => console.log(error))
