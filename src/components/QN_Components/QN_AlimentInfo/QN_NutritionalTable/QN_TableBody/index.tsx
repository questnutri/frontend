"use client";
export default function QN_TableBody() {
  const nutritionalUnitValues: string[] = [
    "Valor energético",
    "Carboidratros",
    "Proteínas",
    "Gorduras Totais",
    "Gorduras Saturadas",
    "Fibra Alimentar",
    "Sódio",
  ];
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
      >
        <thead
          style={{
            backgroundColor: "#55b7fe",
            width: "100%",
            color:'white',
            fontSize:'15px'
          }}
        >
          <tr>
            <th></th>
            <th>Porção por 100g</th>
            <th>Quantidade / Unidade</th>
          </tr>
        </thead>
        <tbody
          style={{
            fontSize: "15px",
          }}
        >
          {nutritionalUnitValues.map((value, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "2px solid",
              }}
            >
              <td
                style={{
                  padding: "4px 10px",
                }}
              >
                {value}
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                {" "}
                100000
              </td>
              <td
                style={{
                  textAlign: "center",
                }}
              >
                1000000
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
