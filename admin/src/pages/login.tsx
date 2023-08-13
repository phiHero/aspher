import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/login.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../components/loader/loader';

const Login: NextPage = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('admin') || 'null')) {
      router.push('/');
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [router]);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    setFormValue({ ...formValue, [type]: value });
  };
  const handleLogin = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formValue);
      console.log(res.data);

      if (res.data.isAdmin) {
        localStorage.setItem('admin', JSON.stringify(res.data));
        router.push('/');
      } else {
        throw new Error('You are not admin!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.Login}>
        <div className={styles.change}></div>
        <div className={styles.img_con}>
          <div className={styles.bimg} id={styles.bimg0}></div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <form onSubmit={handleLogin}>
              <div className={styles.logo}>
                <h1 className={styles.a_logo}>
                  <i>A</i>dsphero
                </h1>
              </div>

              <div className={styles.formBox}>
                <div className={styles.login_logo}>
                  <h2>Đăng nhập</h2>
                  <div className={styles.underBar}></div>
                </div>
                <input
                  type='email'
                  placeholder='Địa chỉ email'
                  onChange={handleOnChange}
                />
                <input
                  type='password'
                  placeholder='Mật khẩu'
                  onChange={handleOnChange}
                />
                <button className={styles.loginButton} type='submit'>
                  Sign In
                </button>
              </div>
              <span>
                Không có tài khoản?
                <b className={styles.link_tag}> Đăng ký </b>
                ngay!
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
