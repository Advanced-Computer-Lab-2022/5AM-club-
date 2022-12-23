import { memo } from "react";
import success from "../../assets/Header/success.png";
import "./UpdatedSuccessfully.css";
import Button from "react-bootstrap/Button";
function UpdatedSuccessfully(props) {
  return (
<<<<<<< HEAD
    <div className="updated-successfully">
      <div className="updated-successfully-text">
=======
    <div className='updated-successfully'>
      <div className='updated-successfully-text'>
>>>>>>> 78a3be8 (complete profile modals done)
        <h4>Updated Successfully</h4>

        <p>
          You have successfully updated your profile. You can now start using
          your account.
        </p>
      </div>
<<<<<<< HEAD
      <div className="updated-successfully-image">
        <img src={success} alt="Success" className="success" />
      </div>
      <Button
        variant="outline-success"
        className="updated-successfully-button"
        onClick={() => {
          props.onClickHide();
          props.unDone();
=======
      <div className='updated-successfully-image'>
        <img src={success} alt='Success' className='success' />
      </div>
      <Button
        variant='outline-success'
        className='updated-successfully-button'
        onClick={() => {
          props.onClickHide();
>>>>>>> 78a3be8 (complete profile modals done)
        }}
      >
        Go to home page
      </Button>
    </div>
  );
}
export default memo(UpdatedSuccessfully);
