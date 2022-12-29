import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig.js";
function useInstructorCompleteProfile(Done) {
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [tos, setTos] = useState("");
  const [contract, setContract] = useState("");
  // eslint-disable-next-line
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
    app
      .put("/instructor/update-profile", obj)
      .then((res) => {
        Done();
      })
      .catch((err) => {
        if (err.response.status === 402) {
          alert(
            "Password is too weak. Needs to be at least 10 characters long and contain at least one number, one lowercase, one uppercase letter, and one symbol."
          );
          return;
        } else if (err.response.status === 406) {
          alert("Invalid email address.");
          return;
        }
      });
  };

  return {
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
  };
}
export default useInstructorCompleteProfile;
