const AddButton = ({ disabled }) => {
  return (
    <button type='submit' disabled={disabled} className='btn'>
      Add
    </button>
  );
};

export default AddButton;
