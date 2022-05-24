// Essentials
import { useRouter } from 'next/router';
import AuthLayout from '../../layout/authLayouts/authLayout';
import { useState } from 'react';
import { LoginService } from '../../services/user/user';
// Next
import Head from 'next/head';
import Link from 'next/link';
// Styles
import styles from '../../styles/login.module.scss';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const res = await LoginService({ email, password });
      if (res) {
        await router.push('/');
      }
    } catch (error) {
      throw error;
    }
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
