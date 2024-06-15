import PropTypes from "prop-types";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex space-x-8 mt-3.5'> {/* Tambahkan space-x-8 untuk jarak antar checkbox */}
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <input
            type='checkbox'
            className='checkbox border-slate-900 rounded-none mr-2' // Menghapus gaya bulat dan menambah margin kanan
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className='label-text'>Male</span>
        </label>
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <input
            type='checkbox'
            className='checkbox border-slate-900 rounded-none mr-2' // Menghapus gaya bulat dan menambah margin kanan
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className='label-text'>Female</span>
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
