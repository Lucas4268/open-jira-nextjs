import mongoose from "mongoose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";



export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {

  const id = req.page.params?.id || ''

  const checkMongoIdRegExp = new RegExp('^[0-9a-fA-F]{24}$');

  if (!checkMongoIdRegExp.test( typeof id === 'string' ? id : '' )) {
    return new Response(JSON.stringify({ message: 'Error, el id no es valido' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return NextResponse.next()
}

