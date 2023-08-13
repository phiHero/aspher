// Essentials
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../../components/loader/loader';
import { _children } from '@/interface/_react';
import styles from './authLayout.module.scss';
import Image from 'next/image';

const bgList = [
  {
    color: '#1ba9c9',
    background: '/img/eren_edited.jpg',
  },
  {
    color: '#dc1f25',
    background: '/img/goblinslayer_edited.jpg',
  },
  {
    color: '#55efc4',
    background: '/img/green4.webp',
  },
  {
    color: '#f39c12',
    background: '/img/yellow.jpg',
  },
];
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const AuthPageLayout = ({ children }: _children) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [selectedBg, setSelectedBg] = useState(
    bgList[getRandomInt(bgList.length)]
  );
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user') || 'null')) {
      router.push('/');
    } else {
      setLoading(false);
    }
    const r = document.querySelector(':root') as HTMLElement;
    r?.style.setProperty('--custom-color-auth', selectedBg.color);
  }, [router]);

  if (loading)
    return <Loader height={'100vh'} color={'var(--custom-color-auth)'} />;
  return (
    <div className={styles.AuthLayout}>
      <div className={styles.change}></div>
      <div className={styles.imgContainer}>
        <Image
          src={selectedBg.background}
          layout='fill'
          alt='background image aspher'
        />
      </div>
      {children}
    </div>
  );
};

export default AuthPageLayout;
