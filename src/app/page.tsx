'use client'

import AuthPage from "@/components/Pages/AuthPage"

export default function RootPage() {
	return (
		<>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundImage: 'url(/images/nutri-background.png)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				height: '100vh',
				margin: 0,
			}}>
				<div style={{
					backgroundColor: '#55B7FE',
					width: '450px',
					height: '420px',
					padding: '30px',
					borderRadius: '0px 10px 10px 0px',
				}}>
					<AuthPage loginPath='admin' />
				</div>
			</div>
		</>
	)
}
