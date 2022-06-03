import { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
// Styles
import styles from '../styles/customize.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import LoginAlert from '../components/loginAlert/loginAlert';
import { _user } from '../interface/_custom';

export default function Customize() {
  const [user, setUser] = useState<_user>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const usernameRef = useRef<string>();
  const profilePicRef = useRef<string>();
  const customColorRef = useRef<string>();
  console.log(customColorRef.current?.value);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, []);
  //   const setCustomColor = async () => {
  //     try {
  //       const res = await axios.put(
  //         `${process.env.REACT_APP_URL}/api/userconfig/customcolor`,
  //         {
  //           customColor: colorRef.current.value,
  //         },
  //         {
  //           headers: {
  //             authorization:
  //               'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
  //           },
  //         }
  //       );
  //       let color = JSON.parse(localStorage.getItem('user') || 'null');
  //       color.customColor = res.data.customColor;
  //       localStorage.setItem('user', JSON.stringify(color));
  //       document.documentElement.style.setProperty(
  //         '--custom_color_client',
  //         res.data.customColor
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const update = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        '/api/user/update',
        {
          username: usernameRef.current?.value,
          profilePic: profilePicRef.current?.value,
          customColor: customColorRef.current?.value,
        },
        {
          headers: {
            authorization: 'Bearer ' + user?.accessToken,
          },
        }
      );
      console.log(res.data);
      res.data.accessToken = JSON.parse(
        localStorage.getItem('user') || 'null'
      ).accessToken;
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) return <LoginAlert />;
  return (
    <div className={styles.Customize}>
      <div className={styles.card}>
        <form className={styles.personalInfo} onSubmit={update}>
          <div className={styles.username}>
            <div className={styles.heading}>Tên người dùng:</div>
            <input
              type='text'
              placeholder='Điền tên bạn vào đây...'
              defaultValue={user?.username}
              ref={usernameRef}
            />
          </div>
          <div className={styles.profilePic}>
            <div className={styles.heading}>Ảnh đại diện:</div>
            <input
              type='text'
              placeholder='Link ảnh (chỉ hỗ trợ từ www.facebook.com)...'
              defaultValue={user?.profilePic}
              ref={profilePicRef}
            />
          </div>
          <div className={styles.customColor}>
            <div className={styles.heading}>Màu yêu thích:</div>
            <input
              type='color'
              defaultValue={user?.customColor}
              ref={customColorRef}
            />
          </div>
          <div className={styles.password} onFocus={() => setIsShown(true)}>
            <div className={styles.heading}>Mật khẩu:</div>
            <input type='password' placeholder='Mật khẩu cũ...' />
          </div>
          {isShown && (
            <>
              <div className={styles.newPassword}>
                <div className={styles.heading}>Mật khẩu mới:</div>
                <input type='password' placeholder='Mật khẩu mới...' />
              </div>
              <div className={styles.confirmPassword}>
                <div className={styles.heading}>Xác nhận mật khẩu:</div>
                <input type='password' placeholder='Xác nhận mật khẩu...' />
              </div>
            </>
          )}
          <button type='submit'>Xác nhận</button>
        </form>
      </div>
    </div>
  );
}

Customize.PageLayout = MainLayout;
