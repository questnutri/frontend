import type { Metadata } from 'next'
import './globals.css'
import App from './app';

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
		<html lang="en">
			<body className={``}>
				<App>
					{children}
				</App>
			</body>
		</html>
	)
}
