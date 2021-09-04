export const Input = ({
  className,
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  inputRef,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};
