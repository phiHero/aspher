// Essentials
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/loader/loader';
import { _children } from '../../interface/_react';
import styles from './authLayout.module.scss';

const AuthPageLayout = ({ children }: _children) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user') || '{}').accessToken) {
      router.push('/');
    } else {
      setLoading(false);
    }
  }, [router]);
  const color_library = ['#dc1f25', '#55efc4', '#f39c12', '#1ba9c9'];
  let i = 0;
  const changeBackground = () => {
    let a = i + 1;
    if (i === color_library.length) {
      i = 0;
    } else {
      let a_logo = document.getElementsByClassName('a-logo')[0];
      a_logo.classList.add('slide');
      a_logo.classList.remove('slide');
      setTimeout(() => {
        a_logo.classList.add('slide');
      }, 1);
      document.documentElement.style.setProperty(
        '--custom-color-auth',
        color_library[i]
      );
      document.getElementById('bimg' + i).style.display = 'none';

      if (a < color_library.length) {
        document.getElementById('bimg' + a).style.display = 'block';
        document.getElementById('bimg' + a).classList.add('fade-in');
      } else {
        document.getElementById('bimg0').style.display = 'block';
        document.getElementById('bimg0').classList.add('fade-in');
      }
      setTimeout(() => {
        if (i === color_library.length) {
          document.getElementById('bimg0').classList.remove('fade-in');
        } else {
          document.getElementById('bimg' + i).classList.remove('fade-in');
        }
      }, 625);
      i++;
    }
  };
  if (loading)
    return <Loader height={'100vh'} color={'var(--custom-color-auth)'} />;
  return (
    <div className={styles.AuthLayout}>
      <div className={styles.change} onClick={changeBackground}></div>
      <div className={styles.imgContainer}>
        <div className={styles.bimg} id={styles.bimg0}></div>
        <div className={styles.bimg} id={styles.bimg1}></div>
        <div className={styles.bimg} id={styles.bimg2}></div>
        <div className={styles.bimg} id={styles.bimg3}></div>
      </div>
      {children}
    </div>
  );
};

export default AuthPageLayout;
