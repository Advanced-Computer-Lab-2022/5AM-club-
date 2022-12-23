import { useState, useEffect } from "react";
import app from "../../utils/AxiosConfig.js";
<<<<<<< HEAD
function useCorporateCompleteProfile(Done) {
=======
function useCorporateCompleteProfile() {
  console.log("useCompleteProfile");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
>>>>>>> 78a3be8 (complete profile modals done)
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTos, setShowTos] = useState(false);
  const [tos, setTos] = useState("");
<<<<<<< HEAD
  // eslint-disable-next-line no-unused-vars
=======
>>>>>>> 78a3be8 (complete profile modals done)
  const [match, setMatch] = useState(true);

  useEffect(() => {
    app.get("/terms-of-service").then((res) => {
      setTos(res.data.content);
    });
  }, []);
  const updateProfile = async (obj) => {
<<<<<<< HEAD
    app
      .put("/trainee/update-profile", obj)
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
=======
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
>>>>>>> 78a3be8 (complete profile modals done)
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
<<<<<<< HEAD
=======
    checkMatching,
>>>>>>> 78a3be8 (complete profile modals done)
  };
}
export default useCorporateCompleteProfile;
