import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig.js";
function useCorporateCompleteProfile() {
  console.log("useCompleteProfile");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [tos, setTos] = useState("");
  const [match, setMatch] = useState(true);

  useEffect(() => {
    app.get("/terms-of-service").then((res) => {
      setTos(res.data.content);
    });
  }, []);
  const updateProfile = async (obj) => {
    try {
      app.put("/trainee/update-profile", obj).then((res) => {});
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    acceptedTerms,
    setAcceptedTerms,
    updateProfile,
    tos,
    showTos,
    setShowTos,
    match,
    checkMatching,
  };
}
export default useCorporateCompleteProfile;
