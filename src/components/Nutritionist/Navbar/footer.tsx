import QN_Button from "@/components/QN_Button";
import { usePopUpGlobal } from "@/components/QN_PopUp/popup.global.context";
import { logout } from "@/lib/logout";
import { useRouter } from "next/navigation";

export default function NutritionistNavbarFooter() {
    const router = useRouter()
    const { showPopUp } = usePopUpGlobal()

    const handleLogout = async () => {
        const response = await logout('nutritionist')
        if (response.status === 204 || response.status === 401) {
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            showPopUp({
                title: 'Você foi desconectado',
                padding: '15px',
                okButton: true,
                blockOutsideClose: true,
            })
            setTimeout(() => {
                router.push('/home')
            }, 500)
        }
    }

    return (
        <div style={{
            height: '10%',
            marginTop: 'auto',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <img src="/logo/logo_vector.png"
                style={{
                    width: '100%',
                    padding: '30px',
                    height: 'auto'
                }} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <QN_Button
                    colorStyle='red'
                    width='40%'
                    onClick={handleLogout}
                >
                    Sair
                </QN_Button>
            </div>
        </div>
    )
}