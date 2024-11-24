'use client'
import AuthPage from "@/components/Pages/AuthPage"
import { IoNutrition } from 'react-icons/io5'
import { FaUserAlt } from 'react-icons/fa'
import QN_Switch from "@/components/QN_Components/QN_Switch"
import { useState } from "react"

export default function RootPage() {
	const [role, setRole] = useState<'nutritionist' | 'patient'>('nutritionist')
	const [isSelected, setIsSelected] = useState(true)

	const handleRoleChange = (isSelected: boolean) => {
		setRole(isSelected ? 'nutritionist' : 'patient')
		setIsSelected(isSelected)
	}

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
					display: 'flex',
					flexDirection: "column",
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'white',
					width: '450px',
					height: '420px',
					padding: '30px',
					borderRadius: '10px 0px 0px 10px',
				}}>
					<img src="/logo/logo_vector.png"
						style={{
							width: '100%',
							padding: '30px',
							height: 'auto'
						}} />
					<QN_Switch
						defaultSelected={true}
						onChange={handleRoleChange}
						onIcon={<IoNutrition className="text-white" />}
						offIcon={<FaUserAlt className="text-white" />}
						onText={{
							value: 'Nutricionista',
							color: 'white'
						}}
						offText={{
							value: 'Paciente',
							color: 'white'
						}}
					/>
				</div>
				<div style={{
					backgroundColor: isSelected ? '#55B7FE' : '#676767',
					width: '450px',
					height: '420px',
					padding: '0px',
					borderRadius: '0px 10px 10px 0px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'start'
				}}>
					<AuthPage loginPath={role} />
				</div>
			</div>
		</>
	)
}