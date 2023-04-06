import { SignJWT } from "jose";
import { getJwtSecretKey } from '@/libs/auth'

export async function POST(request) {
    // // decrypting password
    // const decryptedPassword = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    // const base64 = btoa(String.fromCharCode(...new Uint8Array(decryptedPassword)));
    // console.log(base64);

   const body = await request.json();
    console.log(body)


   if (body.username === 'admin' && body.password === 'admin') {
    //    const token = await jwt.sign({username:body.username},process.env.JWT_SECRET_KEY,{
    //        expiresIn:'1d'
    //    })
    //    return new Response(JSON.stringify({token}),{
    //        status:200,
    //        headers:{
    //            'Content-Type':'application/json'
    //        }
    //    })

        const token = await new SignJWT({
            username:body.username
            ,
            role : 'admin',

            exp:Math.floor(Date.now() / 1000) + (60 * 60),
             
        }).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('2h').sign(getJwtSecretKey())   

        console.log(token)

        // set the cookie
        const response = NextResponse.json({
            success:true,
        })

        
        response.cookies.set({
            name: 'token',
            value: token,
            path: '/',
        })
        return response
}   

}