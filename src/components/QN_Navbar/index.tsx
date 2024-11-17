'use client'
export default function QN_Navbar({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div style={{
            width: '250px', backgroundColor: '#a4a4a4', color: 'black', display: 'flex',
            flexDirection: 'column', height: '100vh', padding: '30px 0px', gap: '35px'
        }}>
            <div style={{ width: '100%', textAlign: 'center', minHeight: '10%', fontSize: '35px' }}>
                <h1>Olá, Nutri!</h1>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '10px' }}>
                {children}
            </div>
            <div style={{ height: '10%', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <img src="/logo/logo_vector.png" style={{ width: '45%', height: 'auto' }} />
            </div>
        </div>
    )
}