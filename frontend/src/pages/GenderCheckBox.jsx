import PropTypes from "prop-types";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <span className='label-text'>Male</span>
          <input
            type='radio'
            className='radio border-slate-900'
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <span className='label-text'>Female</span>
          <input
            type='radio'
            className='radio border-slate-900'
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

GenderCheckbox.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  selectedGender: PropTypes.string.isRequired,
};

export default GenderCheckbox;
