import mongoose from "mongoose";


// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  if( mongoConnection.isConnected !== 0 && mongoConnection.isConnected !== 3 ) {
    console.log('Ya conectado!')
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState 

    if (mongoConnection.isConnected === 1) {
      console.log('usando conexion anterior!')
      return
    }

    // mongoConnection.isConnected = 3
    await mongoose.disconnect()
    // mongoConnection.isConnected = 0
  }

  await mongoose.connect(process.env.MONGO_URL || '')
  mongoConnection.isConnected = 1
  console.log('Conectado a MongoDB')
}


export const disconnect = async () => {

  if (process.env.NODE_ENV === 'development') return

  if (mongoConnection.isConnected === 0) return

  mongoConnection.isConnected = 0

  await mongoose.disconnect()
  console.log('Desconectado de MongoDB')
}