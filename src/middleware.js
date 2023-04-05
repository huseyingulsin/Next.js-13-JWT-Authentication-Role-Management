import {verifyJwtToken} from '@/libs/auth'
import { NextResponse } from 'next/server';


const AUTH_PAGES = ['/login','/register']

const isAuthPages = (pathname) => AUTH_PAGES.some(page => page.startsWith(pathname)) 


export  async function middleware(request) {
    const {url,nextUrl,cookies} = request;
    const {value:token}  = cookies.get('token') ?? {value:null}


    const hasVerifiedToken = token && await verifyJwtToken(token);
    console.log(hasVerifiedToken)
    const isAuthPageRequested = isAuthPages(nextUrl.pathname)

    if (isAuthPageRequested) {
        if(!hasVerifiedToken) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/',url))
    }

    if(!hasVerifiedToken) {
        return NextResponse.redirect(new URL('/login',url))
    }

    return NextResponse.next();

   

}

// Path: src/middleware.js
export const config = {
   matcher:['/panel']
}