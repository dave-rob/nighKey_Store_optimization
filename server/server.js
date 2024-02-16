import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import Redis from "ioredis";
import JSONCache from 'redis-json';

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL, REDIS_URL } = process.env;

// const dbRedis = new Redis(REDIS_URL);
// const jsonCache = new JSONCache(dbRedis);

const client = new pg.Pool({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

// let t=performance.now()
app.get("/api/shoedata",  (req, res) => {
  // const result = await dbRedis.get("shoes")
  // console.log(result);
  // if(result === null){
    // console.log(result);
    client.query("SELECT id, thumbnails, expandedimg FROM shoedata;").then( (result) => {
    // await dbRedis.set("shoes", JSON.stringify(result.rows))
    res.send(result.rows);
  });
  // } else {
  //   //  console.log(result);
  //   res.send(result)
  // }
  
});
// let t1 = performance.now()
// console.log(`task took ${t1-t} milliseconds`)


app.get("/api/shoedata/:id", (req, res) => { 
  // let t2 = performance.now()
  const {id} = req.params;
  // const result =  await dbRedis.get(`shoe${id}`)
  // if(result === null){
    client.query("SELECT * FROM shoedata WHERE id = $1;", [id]).then((result) => {
    // dbRedis.set(`shoe${id}`, JSON.stringify(result.rows[0]))
    res.send(result.rows[0]);
  });
//   } else{
//     // console.log(result)
//     res.send(result)
//   }
// //   let t3 = performance.now()
// console.log(`task took ${t3-t2} milliseconds`)
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});