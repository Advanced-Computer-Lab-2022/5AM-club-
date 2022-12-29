import { memo } from "react";
import success from "../../assets/Header/success.png";
import "./UpdatedSuccessfully.css";
import Button from "react-bootstrap/Button";
function UpdatedSuccessfully(props) {
  return (
    <div className='updated-successfully'>
      <div className='updated-successfully-text'>
        <h4>Updated Successfully</h4>

        <p>
          You have successfully updated your profile. You can now start using
          your account.
        </p>
      </div>
      <div className='updated-successfully-image'>
        <img src={success} alt='Success' className='success' />
      </div>
      <Button
        variant='outline-success'
        className='updated-successfully-button'
        onClick={() => {
          props.onClickHide();
          props.unDone();
        }}
      >
        Go to home page
      </Button>
    </div>
  );
}
export default memo(UpdatedSuccessfully);
