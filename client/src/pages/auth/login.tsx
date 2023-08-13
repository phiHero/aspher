// Essentials
import { useRouter } from 'next/router';
import AuthLayout from '../../layout/authLayouts/authLayout';
import { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
// Next
import Head from 'next/head';
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const schema = Joi.object({
  //   email: Joi.string()
  //     .email({
  //       minDomainSegments: 2,
  //       tlds: { allow: ['com', 'net'] },
  //     })
  //     .required(),
  //   username: Joi.string().alphanum().min(3).max(30).required(),
  //   password: Joi.string()
  //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  //     .required(),
  // });

  const handleLogin = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/login`, { email, password });
      if (res.data && res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        router.push('/');
      }
    } catch (error) {
      alert('Wrong password or email!');
    }
  };
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={styles.Login}>
        <div className={styles.wrapper}>
          <form onSubmit={handleLogin}>
            <div className={styles.logo}>
              <Link href={'/'}>
                <a className={styles.a_logo}>
                  <i className={styles.highlight}>A</i>spher
                </a>
              </Link>
            </div>

            <div className={styles.formBox}>
              <div className={styles.login_logo}>
                <h2>Sign In</h2>
                <div className={styles.underBar}></div>
              </div>
              <input
                type='email'
                placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.loginButton} type='submit'>
                Sign In
              </button>
            </div>
            <span>
              Don&apos;t have an account?
              <Link href={'/auth/register'}>
                <a className={styles.highlight}> Sign up </a>
              </Link>
              now!
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

Login.PageLayout = AuthLayout;
