import type { Metadata } from 'next'
import './globals.css'
import App from './app'

export const metadata: Metadata = {
	title: 'QuestNutri App',
	description: 'Facilitando a sua dieta',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
			</head>
			<body className={``}>
				<App>
					{children}
				</App>
			</body>
		</html>
	)
}
