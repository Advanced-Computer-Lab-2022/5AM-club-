import axios from "axios";
import "./ViewContract.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, memo } from "react";
import proxy from "../../utils/proxy.json";
import { TextareaAutosize } from "@mui/material";
function ViewContract() {
    const [instructor,setInstructor]= useState({})
    
    useEffect(()=> {axios
      .get(proxy.URL + "/get-user", {
        headers: {
          //TODO REPLACE ID WITH TOKEN
          id: localStorage.getItem("id"),
          type: "instructor",
        },
      })
      .then((res) => {
        setInstructor(res.data);
      })},[])
  const navigate = useNavigate();
  const [mainText, setMainText] = useState("Loading Contract...");
  const [contract, setContract] = useState([]);
  console.log(instructor);
function acceptContract(){
    //TODO : CHANGE FROM ID TO TOKEN
    axios.get(proxy.URL+"/accept-contract",{headers:{id:localStorage.getItem("id")}}).then(()=>{navigate("/instructor")})
}
  useEffect(() => {
    setContract([]);
    axios
      .get(proxy.URL + "/view-contract", {
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length === 0)
          setMainText("No contract is available yet");
        else setMainText("");

        setContract(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <>
    {mainText}
      <div>
         Contract: <TextareaAutosize className="contract-text"
            defaultValue={contract}
            readOnly= {true}
          ></TextareaAutosize>
          {!instructor.accepted&&
          <button className= "btn btn-success" onClick={acceptContract} >
            Accept

          </button>
}
      </div>
    </>
  );
}

export default memo(ViewContract);
