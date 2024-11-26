import { FaTrash, FaSearch } from "../../../../icons/index";
import QN_Button from "../../QN_Button";
import QN_Input from "../../QN_Input";
export default function QN_HeaderAlimentInfo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            width: "100%",
            color: "#55b7fe",
            fontSize: "35px",
            fontWeight: "600",
          }}
        >
          Alimeto Principal
        </h1>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaTrash size={30} />
        </div>

        <QN_Button width="100%">Salvar</QN_Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap:'20px'
        }}
      >
        <QN_Input
          value=""
          startContent={<FaSearch size={22} />}
          onChange={() => null}
          withBorder={true}
        />
        <span>
          <QN_Input value="" onChange={() => null} placeHolder="quantidade" withBorder={true}/>
        </span>
        <span>
          <QN_Input value="" onChange={() => null} placeHolder="unidade" withBorder={true}/>
        </span>
      </div>
    </div>
  );
}
