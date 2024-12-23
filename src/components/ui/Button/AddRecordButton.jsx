import { Link } from "react-router-dom";

const AddRecordButton = () => {
  return (
    <Link to='/form'>
      <button className='btn btn-lg'>Add new record</button>
    </Link>
  );
};

export default AddRecordButton;
