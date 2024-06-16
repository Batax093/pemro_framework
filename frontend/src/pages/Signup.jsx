import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckBox";
import useSignup from "../hooks/useSignup";
import { useState } from "react";

function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col mt-3.5">
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={label}
        aria-label={label}
        className="justify-center items-start px-5 py-6 bg-lime-50 rounded-md max-md:pr-5"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex justify-center items-center px-16 py-20 text-base font-black bg-white max-md:px-5">
      <section className="flex flex-col items-center mt-36 max-w-full w-[426px] max-md:mt-10">
        <header className="flex gap-0 text-3xl text-cream-300">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/91d1884f97639bf71bfe1ae8fa28572b897e2beff7f5969b0e0c2c1092edecc0?apiKey=b1d7a673afae4361a48ecfd33debe811&"
            alt="KOPIIN Logo"
            className="shrink-0 max-w-full aspect-[0.71] w-[111px]"
          />
          <div className="flex-auto my-auto text-black">
            KOPI<span className="text-cream-300">IN</span>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col self-stretch px-7 py-7 mt-7 text-cream-100 rounded-md bg-cream-300 max-md:px-5 max-md:max-w-full">
          <InputField
            id="fullName"
            label="Full Name"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            labelClass="text-cream-100"
          />
          <InputField
            id="email"
            label="Email address"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            labelClass="text-cream-100"
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            labelClass="text-cream-100"
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            labelClass="text-cream-100"
          />
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <button
            type="submit"
            className="justify-center items-center px-16 py-6 mt-10 font-black whitespace-nowrap rounded-md bg-cream-500 text-cream-300 max-md:px-5"
          >
            Signup
          </button>
        </form>
        <div className="mt-8 tracking-wider text-cream-500">
          Sudah memiliki akun? <Link to="/login" className="text-black">Login</Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
