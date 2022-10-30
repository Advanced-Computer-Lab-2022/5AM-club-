import Button from "react-bootstrap/Button";
import "./AdminAddUser.css";
import { useState } from "react";
import axios from "axios";
import proxy from "../../utils/proxy.json";
function AdminAddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const addUser = async (event) => {
    event.preventDefault();
    if (type) {
      const response = await axios
        .post(proxy.URL + "/admin/add-" + type, {
          username: userName,
          password: password,
        })
        .catch((err) => alert("Username already used "));
      if (response) alert(response.data);
    } else {
      alert("please select the type");
    }
  };
  return (
    <form onSubmit={addUser}>
      <div className='margin'>
        <label>User type</label>
        <select
          id='type'
          name='type'
          className='form-control'
          onChange={(event) => setType(event.target.value)}
        >
          <option value=''>Select user type </option>
          <option value='admin'>Admin</option>
          <option value='instructor'>Instructor</option>
          <option value='corporate-trainee'>CorporateTrainee</option>
        </select>
      </div>
      <div className='form-group' className='margin'>
        <label>Username</label>
        <input
          type='String'
          className='form-control'
          id='userName'
          placeholder='Enter username'
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div className='form-group' className='margin'>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          placeholder='Enter password'
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <Button variant='outline-success' type='submit' className='margin'>
        Submit
      </Button>
    </form>
  );
}

export default AdminAddUser;
