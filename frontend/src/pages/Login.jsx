import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { useState } from 'react';

function InputField({ label, type, id, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col mb-3.5">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="justify-center items-start px-5 py-6 bg-lime-50 rounded-md max-md:pr-5"
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center px-16 py-20 text-base font-black bg-white max-md:px-5">
      <section className="flex flex-row items-center justify-center mt-10 max-w-full w-[1024px] max-md:flex-col gap-20">
        <div className="flex flex-auto items-center w-[426px] max-md:w-full">
          <header className='flex items-center justify-center mt-32'>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad85c4155f0e32321bbf50e0bf08b12a4aeb02c45149bf9c7f6d9928fc214f1d?apiKey=b1d7a673afae4361a48ecfd33debe811&"
              alt="Image"
              className='w-[812px] h-auto'
            />
          </header>
        </div>
        <div className="flex flex-col items-center w-[426px] max-md:w-full">
          <header className="flex items-center gap-4 mb-5 text-3xl text-cream-300">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/91d1884f97639bf71bfe1ae8fa28572b897e2beff7f5969b0e0c2c1092edecc0?apiKey=b1d7a673afae4361a48ecfd33debe811&"
              alt="Logo"
              className="w-[111px] h-auto"
            />
            <div className="text-black">
              KOPI<span className="text-cream-300">IN</span>
            </div>
          </header>
          <form onSubmit={handleSubmit} className="flex flex-col self-stretch px-7 py-6 text-cream-100 rounded-md bg-cream-300 max-md:px-5">
            <InputField
              label="Email address"
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loading}
              type="submit"
              className="justify-center items-center px-16 py-6 mt-10 font-black whitespace-nowrap rounded-md bg-cream-500 text-cream-300 max-md:px-5"
            >
              {loading ? <span className="loading-spinner"></span> : 'Login'}
            </button>
          </form>
          <div className="mt-8 tracking-wider text-cream-500">
            Belum memiliki akun?{' '}
            <Link to="/signup" className="text-black">
              Signup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
