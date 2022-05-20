// Essentials
import AuthLayout from '../../layout/authLayouts/authLayout';
import axios from 'axios';
import { useRef } from 'react';
import { useState } from 'react';
// Next
import Head from 'next/head';
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const handleFinish = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    //   setEmail(emailRef.current.value);
    //   setPassword(passwordRef.current.value);
    //   setUsername(usernameRef.current.value);
    //   try {
    //     await axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, {
    //       email,
    //       username,
    //       password,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.Login}>
        <div className={styles.wrapper}>
          <form onSubmit={handleFinish}>
            <div className={styles.logo}>
              <h1 className={styles.a_logo}>
                <i>A</i>dsphero
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
              <button className='loginButton' type='submit'>
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
