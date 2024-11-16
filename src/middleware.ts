'use server'
import { NextResponse, NextRequest } from 'next/server'
import axios from './lib/axiosInstance'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')

    if (token) {
        const validateToken = await axios.get('/auth', {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        })

        if (validateToken.status !== 200) {
            const response = NextResponse.redirect(new URL('/home', request.url))
            response.cookies.delete('authToken')
            return response
        }

        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/home', request.url))
        }
        
        return NextResponse.next()
    }

    if (request.nextUrl.pathname !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

//protected routes
export const config = {
    matcher: ['/', '/home/:path*', '/profile/:path*']
}
