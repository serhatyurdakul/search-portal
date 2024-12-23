const FormInput = ({
  name,
  label,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
  autoFocus = false,
}) => {
  return (
    <div className={`form-item ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type='text'
        name={name}
        id={name}
        className={`input input-md ${error ? "error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      {error && <p className='error-text'>{error}</p>}
    </div>
  );
};

export default FormInput;
