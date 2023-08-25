import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import styles from '../styles/login.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../components/loader/loader';
import { setCookie } from '@/utils/cookie';

export default function Login() {
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
      if (res.data.isAdmin) {
        localStorage.setItem('admin', JSON.stringify(res.data));
        router.push('/');
      } else {
        throw new Error('You are not admin!');
      }
    } catch (error) {
      alert('Sorry, there is an error!');
      console.log(error);
    }
  };

  const handleGuestLogin = () => {
    setCookie('atk', 'guest', 0.02);
    router.push('/');
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.Login}>
      <div className={styles.img_con}>
        <video src='/assets/room-min.webm' autoPlay muted loop></video>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <form onSubmit={handleLogin}>
            <div className={styles.logo}>
              <h1 className={styles.a_logo}>
                <i>A</i>dspher
              </h1>
            </div>

            <div className={styles.formBox}>
              <div className={styles.login_logo}>
                <h2>Sign In</h2>
                <div className={styles.underBar}></div>
              </div>
              <input
                type='email'
                placeholder='Email address'
                onChange={handleOnChange}
              />
              <input
                type='password'
                placeholder='Password'
                onChange={handleOnChange}
              />
              <button className={styles.loginButton} type='submit'>
                Sign In
              </button>
            </div>
            <span>
              Don&apos;t have an account? Try
              <b
                className={styles.link_tag}
                role='button'
                onClick={handleGuestLogin}
              >
                {' '}
                Guest login{' '}
              </b>
              now!
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
Login.Title = 'Login - Adspher';
