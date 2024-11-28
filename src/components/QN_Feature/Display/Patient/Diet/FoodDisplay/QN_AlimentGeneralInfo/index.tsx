import { BsFire, FaTrash } from "@/icons";
import { MdEdit } from "react-icons/md";

export default function QN_MealGeneralInfo() {
	return (
		<div
			style={{
				display: "flex",
				minWidth: '300px',
				width: "fit-content",
				justifyContent: "space-between",
				padding: "10px 20px 10px 0px",
				alignItems: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					width: "fit-content",
					gap: "5px",
				}}
			>
				<BsFire color="#55b7fe" size={20} />
				<h1
					style={{
						fontSize: "14px",
						fontWeight: "600",
					}}
				>
					9999 kcal
				</h1>
			</div>
			<div>
				<h1
					style={{
						fontSize: "14px",
						fontWeight: "600",
					}}
				>
					9999 unidades
				</h1>
			</div>
			<div
				style={{
					display: "flex",
					width: "fit-content",
					gap: "5px",
				}}
			>
				<MdEdit
					size={'23px'}
					color='#55b7fe'
					style={{
						cursor: 'pointer',
						transition: 'color 0.3s ease',
					}}
					title='Editar'
					className='hover-icon'
					onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
					onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
					onClick={undefined}
				/>
				<FaTrash
					size={'20px'}
					color='#55b7fe'
					style={{
						cursor: 'pointer',
						transition: 'color 0.3s ease',
					}}
					title='Excluir'
					className='hover-icon'
					onMouseEnter={(e) => (e.currentTarget.style.color = '#494a4a')}
					onMouseLeave={(e) => (e.currentTarget.style.color = '#55b7fe')}
					onClick={undefined}
				/>
			</div>
		</div>
	);
}
