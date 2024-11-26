'use client'
import QN_TextArea from "../QN_TextArea";
import QN_HeaderAlimentInfo from "./QN_HeaderAlimentInfo";
import QN_NutritionalTable from "./QN_NutritionalTable";

export default function QN_AlimentInfo() {
  return (
    <div
      style={{
        backgroundColor: "#EAEAEA",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        padding: "20px",
        alignItems: "start",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          width:'70%',
          gap:'20px'
        }}
      >
        <QN_HeaderAlimentInfo />
        <QN_NutritionalTable />
        <QN_TextArea 
          value="" 
          onChange={() => null} 
          label="Observações do alimento:" 
          maxRows={8} 
          minRows={8}
          fontColorLabel="#55b7fe"
          fontSizeLabel="23px"
          fontWeightLabel="600"  
        />
      </div>
    </div>
  );
}
