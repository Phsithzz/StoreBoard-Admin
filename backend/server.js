import express from "express"

import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

import dotenv from "dotenv"

import { sql } from "./config/db.js"

import productRoute from "./routes/productRoute.js"

import {aj} from "./lib/arcjet.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors(
    {
     origin: [
    "http://localhost:5173",
    "https://store-board-admin-kz66k301h-phsithzzs-projects.vercel.app"
  ]
    }
))
app.use(helmet({
    contentSecurityPolicy:false
}))
app.use(morgan("dev"))

app.use(async (req,res,next)=>{
    try {
        const decision = await aj.protect(req,{
            requested:1
        })

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({
                    error:"Too Many Requests"
                })
            }else if(decision.reason.isBot()){
                res.status(403).json({
                    error:"No bots allowed"
                })
            }else{
                res.status(403).json({
                    error:"Forbidden"   
                })
            }
            return
        }


        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed())){
            res.status(403).json({
                error:"Spoofed bot detected"
            })
            return
        }
        next()
    } catch (err) {
console.log("Arcjet Error",err)
next(err)
        
    }
})
app.use("/products",productRoute)

async function initDB(){
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP    

        )
        `

        console.log("Database init")
    } catch (err) {
        console.log("Error InitDB",err)
        
    }
}


initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server is Runnig on Port: ${PORT} `)
})
})

