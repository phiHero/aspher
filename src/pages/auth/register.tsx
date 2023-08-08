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

export default function Register() {
  const router = useRouter();
  const [formValue, setFormValue] = useState<{
    email: string;
    username: string;
    password: string;
  }>({ email: '', username: '', password: '' });
  const [error, setError] = useState({});
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required()
      .messages({
        'string.empty': `"Email" không thể để trống!`,
        'any.required': `"Email" là bắt buộc!`,
        'string.email': `"Email" không đúng định dạng!`,
      }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.empty': `"Tên tài khoản" không thể để trống!`,
      'string.min': `"Tên tài khoản" cần có độ dài ít nhất là {#limit}!`,
      'string.max': `"Tên tài khoản" cần có độ dài nhiều nhất là {#limit}!`,
      'any.required': `"Tên tài khoản" là bắt buộc!`,
    }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
      .messages({
        'string.empty': `"Mật khẩu" không thể để trống!`,
        'any.required': `"Mật khẩu" là bắt buộc!`,
        'string.pattern.base':
          '"Mật khẩu" phải chứa các kí tự từ a-z, 0-9 và có độ dài từ 3-30!',
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
      let errors: { email: string; username: string; password: string } = {};
      for (let item of error.details) {
        const label = item.path[0];
        const message = item.message;
        errors[label] = message;
      }
      setError(errors);
      return;
    }
    setError({});
    try {
      const res = await axios.post(`/api/auth/register`, formValue);
      res.status === 201 && router.push('/auth/login');
    } catch (err) {
      console.log(err);
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
                  <i className={styles.highlight}>A</i>sphero
                </a>
              </Link>
            </div>
            <div className={styles.formBox}>
              <div className={styles.login_logo}>
                <h2>Đăng ký</h2>
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
                placeholder='Địa chỉ email'
                value={formValue?.email}
                onChange={handleOnChange}
              />
              {error?.email && <span>{error.email}</span>}
              <input
                className={error?.username ? styles.error : null}
                name='username'
                type='text'
                placeholder='Tên tài khoản'
                value={formValue?.username}
                onChange={handleOnChange}
              />
              {error?.username && <span>{error.username}</span>}
              <input
                className={error.password ? styles.error : null}
                name='password'
                type='password'
                placeholder='Mật khẩu'
                value={formValue?.password}
                onChange={handleOnChange}
              />
              {error?.password && <span>{error.password}</span>}
              <button className={styles.loginButton} type='submit'>
                Sign Up
              </button>
            </div>
            <span>
              Đã có tài khoản?
              <Link href={'/auth/login'}>
                <a className={styles.highlight}> Đăng nhập </a>
              </Link>
              ngay!
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

Register.PageLayout = AuthLayout;
Register.Title = 'Đăng ký';
