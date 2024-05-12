import { dbinit } from './db';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

dbinit().then(()=>{
    app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));
})
.catch((err)=>{
    console.log('Database Connection Failed');
})
