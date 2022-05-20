// Essentials
import AuthLayout from '../../layout/authLayouts/authLayout';
import { useState } from 'react';
// Next
import Head from 'next/head';
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    // try {
    //   const admin = await LoginService({ email, password });
    //   if (admin) {
    //     await router.push('/');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.Login}>
        <div className={styles.wrapper}>
          <form onSubmit={handleLogin}>
            <div className={styles.logo}>
              <h1 className={styles.a_logo}>
                <i>A</i>sphero
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Mật khẩu'
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.loginButton} type='submit'>
                Sign In
              </button>
            </div>
            <span>
              Không có tài khoản?
              <Link href={'/auth/register'}>
                <a> Đăng ký </a>
              </Link>
              ngay!
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

Login.PageLayout = AuthLayout;
