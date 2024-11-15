export default function LoggedLayout({children}: Readonly<{children: React.ReactNode}>) {

	return (
        <div>
            {/* <QN_Navbar></QN_Navbar> */}
            <h1>Logged Layout OK - NavBar</h1>
            {children}
        </div>
	)
}
