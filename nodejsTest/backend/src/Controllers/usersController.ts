import { RequestHandler } from 'express';
import { RequestHandler,Request,Response } from 'express'
import {v4 as uid} from 'uuid'

const _db = new DatabaseHelper()
interface ExtendedRequest extends Request{
    body:{Name:string,Email:string},
    params:{id:string}
}

// Controller to get All User
export const getAllUser RequestHandler = async (req,res)=>{
    try {
        const user: Users[] =  await (await _db.exec('getAllUser')).recordset
        res.status(200).json(users)

        
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get Single User

export const getSingleUser = async (req,res)=>{
    try {
        const id = req.params.id
        const user: Users[] =  await (await _db.exec('getAllUser')).recordset
        } 
        catch (error) {
        
    }
}