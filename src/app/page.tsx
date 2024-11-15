'use client'
import QN_Button from '@/components/QN_Button'
import QN_Input from '@/components/QN_Input'
import { login } from '@/lib/login'
import { useState } from 'react'

export default function AuthPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

	const handleLogin = async () => {
		try {
			const response = await login({ email, password })
			console.log(response)
		} catch (error) {
			console.error('Erro no login', error)
		}
	}

	return (
		<div
			style={{
				backgroundImage: 'url(/images/nutri-background.png)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				height: '100vh',
				margin: 0
			}}
		>
			<QN_Input label='E-mail' onChange={handleEmailChange} value={email} required />
			<QN_Input label='Senha' type='password' onChange={handlePasswordChange} value={password} required/>
			<QN_Button type='submit' onClick={handleLogin}>Login</QN_Button>
		</div >
	)
}
