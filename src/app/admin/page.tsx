'use client'
import AuthPage from '@/components/Pages/AuthPage'
import { Button } from '@nextui-org/react'

export default function RootAdminPage() {
	return(
		<>
			<AuthPage loginPath='admin' />
			<Button>Testando</Button>
		</>
	)
}