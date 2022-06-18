// Essentials
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import Joi from 'joi';
import axios from 'axios';
// Styles
import styles from '../styles/customize.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import LoginAlert from '../components/loginAlert/loginAlert';
import { _user } from '../interface/_custom';
import { Router } from '@mui/icons-material';

export default function Customize() {
  const [user, setUser] = useState<_user>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [formValue, setFormValue] = useState({
    username: '',
    profilePic: '',
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [error, setError] = useState({});
  const router = useRouter();
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.empty': `"Tên tài khoản" không thể để trống!`,
      'string.min': `"Tên tài khoản" cần có độ dài ít nhất là {#limit}!`,
      'string.max': `"Tên tài khoản" cần có độ dài nhiều nhất là {#limit}!`,
      'any.required': `"Tên tài khoản" là bắt buộc!`,
    }),
    profilePic: Joi.string()
      .regex(
        new RegExp(
          '((http|https)://)i.pinimg.com\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)'
        )
      )
      .allow('')
      .messages({
        'string.pattern.base':
          'Link ảnh không đúng định dạng! Ví dụ:"https://i.pinimg.com/..."',
      }),
    customColor: Joi.string(),
    newPassword: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
      .messages({
        'string.empty': `"Mật khẩu" không thể để trống!`,
        'any.required': `"Mật khẩu" là bắt buộc!`,
        'string.pattern.base':
          '"Mật khẩu" phải chứa các kí tự từ a-z, 0-9 và có độ dài từ 3-30!',
      }),
    repeatNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': `"Mật khẩu" không trùng khớp!`,
        'any.required': `"Mật khẩu" là bắt buộc!`,
      }),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(user);
    setFormValue({
      username: user?.username,
      profilePic: user?.profilePic,
      customColor: user?.customColor,
    });
  }, []);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const update = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { error } = schema.validate(formValue, { abortEarly: false });
    if (error?.details) {
      let errors: { username: string } = {};
      for (let item of error.details) {
        const label = item.path[0];
        const message = item.message;
        errors[label] = message;
      }
      console.log(error.details[0].type);

      setError(errors);
      return;
    }
    setError({});
    try {
      const res = await axios.put('/api/user/update', formValue);
      console.log(res.data);
      res.data.accessToken = JSON.parse(
        localStorage.getItem('user') || 'null'
      ).accessToken;
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(error);

  if (!user) return <LoginAlert />;
  return (
    <div className={styles.Customize}>
      <div className={styles.card}>
        <form className={styles.personalInfo} onSubmit={update}>
          <div className={styles.username}>
            <div className={styles.heading}>Tên người dùng:</div>
            <input
              className={error.username && styles.error}
              name='username'
              type='text'
              placeholder='Điền tên bạn vào đây...'
              onChange={handleOnChange}
              value={formValue?.username}
            />
            {error.username && (
              <span className={styles.errorMessage}>{error.username}</span>
            )}
          </div>
          <div className={styles.profilePic}>
            <div className={styles.heading}>Ảnh đại diện:</div>
            <input
              className={error.profilePic && styles.error}
              name='profilePic'
              type='text'
              placeholder='Link ảnh (chỉ hỗ trợ từ www.pinterest.com)...'
              onChange={handleOnChange}
              value={formValue?.profilePic}
            />
            {error.profilePic && (
              <span className={styles.errorMessage}>{error.profilePic}</span>
            )}
          </div>
          <div className={styles.customColor}>
            <div className={styles.heading}>Màu yêu thích:</div>
            <input
              name='customColor'
              type='color'
              onChange={handleOnChange}
              value={formValue?.customColor}
            />
          </div>
          <div className={styles.password} onFocus={() => setIsShown(true)}>
            <div className={styles.heading}>Mật khẩu:</div>
            <input
              className={error?.password && styles.error}
              name='password'
              type='password'
              placeholder='Mật khẩu cũ...'
              onChange={handleOnChange}
            />
          </div>
          {isShown && (
            <>
              <div className={styles.newPassword}>
                <div className={styles.heading}>Mật khẩu mới:</div>
                <input
                  className={error?.newPassword && styles.error}
                  name='newPassword'
                  type='password'
                  placeholder='Mật khẩu mới...'
                  onChange={handleOnChange}
                  value={formValue?.newPassword}
                />
                {error.newPassword && (
                  <span className={styles.errorMessage}>
                    {error.newPassword}
                  </span>
                )}
              </div>
              <div className={styles.confirmPassword}>
                <div className={styles.heading}>Xác nhận mật khẩu:</div>
                <input
                  className={error?.repeatNewPassword && styles.error}
                  name='repeatNewPassword'
                  type='password'
                  placeholder='Xác nhận mật khẩu...'
                  onChange={handleOnChange}
                  value={formValue?.repeatNewPassword}
                />
                {error.repeatNewPassword && (
                  <span className={styles.errorMessage}>
                    {error.repeatNewPassword}
                  </span>
                )}
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
