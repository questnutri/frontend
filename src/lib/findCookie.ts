export function findCookie(cookie: string): string | null {
    if (typeof window !== 'undefined') {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith(cookie))?.split('=')[1]
        return token || null
    }
    return null
}