// Essentials
import { useRouter } from 'next/router';
import axios from 'axios';
import Joi from 'joi';
import { useState } from 'react';
// Next
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';
import AuthLayout from '../../layout/authLayouts/authLayout';

type _joiError = {
  email: string;
  username: string;
  password: string;
};
export default function Register() {
  const router = useRouter();
  const [formValue, setFormValue] = useState<{
    email: string;
    username: string;
    password: string;
  }>({ email: '', username: '', password: '' });
  const [error, setError] = useState<_joiError | null>(null);
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required()
      .messages({
        'string.empty': `"Email" cannot be empty!`,
        'any.required': `"Email" is required!`,
        'string.email': `"Email" is not in the right format!`,
      }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.empty': `"Username" cannot be empty!`,
      'string.min': `"Username" has a minimum length of {#limit}!`,
      'string.max': `"Username" has a maximun length of {#limit}!`,
      'any.required': `"Username" is required!`,
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': `"Password" cannot be empty!`,
      'any.required': `"Password" is required!`,
      'string.min': `"Password" has a minimum length of {#limit}!`,
    }),
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleFinish = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { error } = schema.validate(formValue, { abortEarly: false });
    if (error?.details) {
      let errors = { email: '', username: '', password: '' };
      for (let item of error.details) {
        const label = item.path[0];
        const message = item.message;
        errors[label as 'email' | 'username' | 'password'] = message;
      }
      setError(errors as _joiError);
      return;
    }
    setError(null);
    try {
      const res = await axios.post(`/api/auth/register`, formValue);
      if (res.status === 201) {
        alert('Success!');
        router.push('/auth/login');
      }
    } catch (err) {
      console.log(err);
      alert('Error! Please try again!');
    }
  };
  return (
    <>
      <div className={styles.Login}>
        <div className={styles.wrapper}>
          <form onSubmit={handleFinish}>
            <div className={styles.logo}>
              <Link href={'/'}>
                <a className={styles.a_logo}>
                  <i className={styles.highlight}>A</i>spher
                </a>
              </Link>
            </div>
            <div className={styles.formBox}>
              <div className={styles.login_logo}>
                <h2>Sign up</h2>
                <div className={styles.underBar}></div>
              </div>
              <input
                className={
                  error?.email
                    ? `${styles.emailInput} ${styles.error}`
                    : styles.emailInput
                }
                name='email'
                type='email'
                placeholder='Email address'
                value={formValue?.email}
                onChange={handleOnChange}
              />
              {error?.email && <span>{error.email}</span>}
              <input
                className={error?.username ? styles.error : ''}
                name='username'
                type='text'
                placeholder='username'
                value={formValue?.username}
                onChange={handleOnChange}
              />
              {error?.username && <span>{error.username}</span>}
              <input
                className={error?.password ? styles.error : ''}
                name='password'
                type='password'
                placeholder='Password'
                value={formValue?.password}
                onChange={handleOnChange}
              />
              {error?.password && <span>{error.password}</span>}
              <button className={styles.loginButton} type='submit'>
                Sign Up
              </button>
            </div>
            <span>
              Already have an account?
              <Link href={'/auth/login'}>
                <a className={styles.highlight}> Sign in </a>
              </Link>
              now!
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

Register.PageLayout = AuthLayout;
Register.Title = 'Đăng ký';
