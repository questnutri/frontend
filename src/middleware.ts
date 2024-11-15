'use server'
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    //Auth
    return NextResponse.redirect(new URL('/', request.url))
}

//protected routes
export const config = {
    matcher: '/home/:path*',
}
