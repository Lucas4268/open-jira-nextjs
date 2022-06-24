import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Entry, IEntry } from '../../../../models'

type Data = 
  | { message: string }
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  // const { id } = req.query

  // if (!mongoose.isValidObjectId( id )) {
  //   return res.status(400).json({ message: 'Error, el id no es valido' })
  // }

  switch ( req.method ) {
    case 'GET':
      return getEntry( req, res )
    
    case 'PUT':
      return updateEntry( req, res )

    case 'DELETE':
      return deleteEntry( req, res )

    default:
      return res.status(400).json({ message: 'Error, el endpoint no existe' })
  }
}



const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query
  
  try {
    await db.connect()
    const entry = await Entry.findById( id )
    await db.disconnect()

    if (!entry) return res.status(404).json({ message: 'Error, no se encontro el registro' })

    return res.status(200).json( entry )

  } catch (error) {
    await db.disconnect()
    res.status(400).json({ message: 'Error, no se pudo actualizar el registro' })
  }
}



const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query
  
  await db.connect()

  const entryToUpdate = await Entry.findById( id )

  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(404).json({ message: 'Error, no se encontro el registro' })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body

  try {
    const entryUpdated = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true } )
    await db.disconnect()

    return res.status(200).json( entryUpdated! )

  } catch (error) {
    await db.disconnect()
    res.status(400).json({ message: 'Error, no se pudo actualizar el registro' })
  }
}


const deleteEntry = async( req: NextApiRequest, res: NextApiResponse ) => {

  const { id } = req.query

  try {
    await db.connect()
    await Entry.findByIdAndDelete( id )
    await db.disconnect

    res.status(200).json({ message: 'Registro eliminado' })
  } catch (error) {
    await db.disconnect()
    res.status(400).json({ message: 'Error, no se pudo actualizar el registro' })
  }
}
