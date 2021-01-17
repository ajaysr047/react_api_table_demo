import './Bottle.css';
import  React, { useState }  from "react";


const Bottle = () =>{
   
    const [val1, setVal1] = useState(0);
    const [val2, setVal2] = useState(0);
    const [res, setRes] = useState(0);

    const sumTwo = ()=>{
        setRes(parseInt(val1) +parseInt(val2))
    }

    return(
        <div>
            <input value = {val1} type="number"  onChange = {(e)=>setVal1(e.target.value)}/>
            <input value = {val2} type="number" onChange = {(e)=>setVal2(e.target.value)}/>
            <input value = {res} />
            <button onClick={sumTwo}>sum</button>
        </div>
        );
}

export default Bottle;