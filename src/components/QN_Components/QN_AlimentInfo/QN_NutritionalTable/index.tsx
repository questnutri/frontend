import QN_HeaderTable from "./QN_HeaderTable";
import QN_TableBody from "./QN_TableBody";

export default function QN_NutritionalTable(){
    return(
        <div
            style={{
                backgroundColor:'#55b7fe',
                width:'100%',
                padding:'20px',
                display:'flex',
                flexDirection:'column',
                borderRadius:'10px'
            }}
        >
            {<QN_HeaderTable/>}
            {<QN_TableBody/>}
        </div>
    )
}