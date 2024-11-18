'use server'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')

    if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/auth`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        })

        if (response.status !== 200) {
            const nextResponse = NextResponse.redirect(new URL('/home', request.url))
            nextResponse.cookies.delete('authToken')
            return nextResponse
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
    matcher: ['/', '/home/:path*', '/profile/:path*', '/patients/:path*']
}
