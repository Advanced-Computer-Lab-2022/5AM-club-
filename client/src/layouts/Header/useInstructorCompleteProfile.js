import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig.js";
function useInstructorCompleteProfile() {
  console.log("useCompleteProfile");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [tos, setTos] = useState("");
  const [contract, setContract] = useState("");
  const [match, setMatch] = useState(true);

  useEffect(() => {
    app.get("/terms-of-service").then((res) => {
      setTos(res.data.content);
    });
    app.get("/contract").then((res) => {
      setContract(res.data.content);
    });
  }, []);
  const updateProfile = async (obj) => {
    try {
      app.put("/instructor/update-profile", obj).then((res) => {});
    } catch (err) {
      console.log(err);
    }
  };

  const checkMatching = () => {
    setMatch(password === repeatPassword);
  };

  return {
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    email,
    setEmail,
    acceptedTerms,
    setAcceptedTerms,
    acceptedContract,
    setAcceptedContract,
    updateProfile,
    tos,
    showTos,
    setShowTos,
    contract,
    showContract,
    setShowContract,
    match,
    checkMatching,
  };
}
export default useInstructorCompleteProfile;
