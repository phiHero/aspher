// Essentials
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
// Next
import Head from 'next/head';
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';
import AuthLayout from '../../layout/authLayouts/authLayout';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const handleFinish = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      const res = await axios.post(`/api/auth/register`, {
        email,
        username,
        password,
      });
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
              <h1 className={styles.a_logo}>
                <i>A</i>sphero
              </h1>
            </div>

            <div className={styles.formBox}>
              <div className={styles.login_logo}>
                <h2>Đăng ký</h2>
                <div className={styles.underBar}></div>
              </div>
              <input type='email' placeholder='Địa chỉ email' ref={emailRef} />
              <input
                type='username'
                placeholder='Tài khoản'
                ref={usernameRef}
              />
              <input type='password' placeholder='Mật khẩu' ref={passwordRef} />
              <button className={styles.loginButton} type='submit'>
                Sign Up
              </button>
            </div>
            <span>
              Đã có tài khoản?
              <Link href={'/auth/login'}>
                <a> Đăng nhập </a>
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
