import QN_Navbar from "@/components/QN_Navbar";

export default function LoggedLayout({children}: Readonly<{children: React.ReactNode}>) {

	return (
        <div>
            <QN_Navbar>
                <></>
            </QN_Navbar>
            <h1>Layout 2</h1>
            {children}
        </div>
	)
}
