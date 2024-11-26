import { useState } from "react";
import { FaEdit } from "../../../icons/index";
import QN_MealGeneralInfo from "./QN_AlimentGeneralInfo";
import QN_Modal from "../QN_Modal";


export default function QN_MealComponent() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#EAEAEA",
        height: "40px",
        borderRadius: "10px",
      }}
      onClick={() => setOpenModal(true)}
    >
      <div
        style={{
          display: "flex",
          width: "fit-content",
          justifyContent: "start",
          padding: "10px",
          color: "#55b7fe",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <FaEdit color="#55b7fe" size={20} />
        <h1
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Nome do alimento
        </h1>
      </div>
      {<QN_MealGeneralInfo />}
      <QN_Modal isOpen={openModal} setOpen={setOpenModal} blockOutsideClose={false}>
          <></>
      </QN_Modal>
    </div>
  )
}
