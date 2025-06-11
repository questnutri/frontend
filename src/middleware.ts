'use server'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')
    const urlPath = request.nextUrl.pathname

    const adminPaths = []
    const nutritionistPaths = []
    const patientPaths = ['/home']

    if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030/api/v1'}/auth`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        })

        if (response.status !== 200) {
            const nextResponse = NextResponse.redirect(new URL('/', request.url))
            nextResponse.cookies.delete('authToken')
            nextResponse.cookies.delete('role')
            return nextResponse
        }

        if (urlPath === '/') {
            return NextResponse.redirect(new URL('/home', request.url))
        }

        const data = await response.json()
        const res = NextResponse.next()
        res.cookies.set('role', data.role) //Prevent role change
        switch (data.role) {
            case 'admin':
                return res
            case 'nutritionist':
                return res
            case 'patient':
                if(patientPaths.includes(urlPath)) return res
                return NextResponse.redirect(new URL('/home', request.url))
        }

    }

    if (urlPath !== '/') {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/', '/home/:path*', '/profile/:path*', '/patients/:path*'],
    runtime: 'nodejs'
}