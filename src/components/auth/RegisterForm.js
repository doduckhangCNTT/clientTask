import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
  // Context
  const { registerUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // Local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [alert, setAlert] = useState(null);
  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Password dont match' });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        // navigate('/dashboard');
      } else {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className='my-4' onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
