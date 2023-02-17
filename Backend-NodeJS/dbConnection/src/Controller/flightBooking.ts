import { Booking } from './../Models/index';
import { RequestHandler } from "express";
import mssql from 'mssql'
import {v4 as uid} from 'uuid';
import {sqlConfig} from '../Config/db'


export const getBookings: RequestHandler = async(req,res)=>{

    try {
            const pool = await mssql.connect(sqlConfig)
            const Booking = await (await pool.request().execute('getFlightsBookings')).recordsets
            res.status(200).json(Booking)

    } catch (error) {
        res.status(404).json(error.message)
    }

}