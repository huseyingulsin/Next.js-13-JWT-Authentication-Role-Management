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
        // where we are coming?: searchParams is a query string that we can use to redirect to the page we were trying to access
        const searchParams = new URLSearchParams(nextUrl.searchParams);
        searchParams.set('next',nextUrl.pathname)
        return NextResponse.redirect(new URL(`/login?${searchParams}`,url))
    }

    return NextResponse.next();

   

}

// we should define the URLS that we want to use the middleware in the following lines
export const config = {
   matcher:['/panel']
}