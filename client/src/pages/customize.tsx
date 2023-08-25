// Essentials
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Joi from 'joi';
import axios from 'axios';
// Styles
import styles from '../styles/customize.module.scss';
import MainLayout from '../layout/mainLayout/mainLayout';
import LoginAlert from '@/components/loginAlert/loginAlert';
import { _user } from '@/interface/_user';
type _joiErr = {
  username: string;
  profilePic: string;
  password: string;
  newPassword: string;
  repeatNewPassword: string;
  customColor: string;
};
export default function Customize() {
  const [user, setUser] = useState<_user>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [formValue, setFormValue] = useState({
    username: '',
    profilePic: '',

    customColor: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [joiError, setJoiError] = useState<_joiErr | null>(null);
  const router = useRouter();
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.empty': `"Username" cannot be empty!`,
      'string.min': `"Username" has minimum length {#limit}!`,
      'string.max': `"Username" has maximum length of {#limit}!`,
      'any.required': `"Username" is required!`,
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
          'URL is not the right format! Example:"https://i.pinimg.com/..."',
      }),
    customColor: Joi.string(),
  });
  const passwordSchema = Joi.object({
    password: Joi.string().min(6).required().messages({
      'string.empty': `"Password" cannot be empty!`,
      'any.required': `"Password" is required!`,
      'string.min': '"Password" has minimum length of {#limit}',
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.empty': `"Password" cannot be empty!`,
      'any.required': `"Password" is required!`,
      'string.min': '"Password" has minimum length of {#limit}',
    }),
    repeatNewPassword: Joi.any()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': `"Password" does not match!`,
        'any.required': `"Password" is required!`,
      }),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(user);
    setFormValue({
      ...formValue,
      username: user?.username,
      profilePic: user?.profilePic,
      customColor: user?.customColor,
    });
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };
  const update = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { error } = schema.validate(formValue, { abortEarly: false });
    if (error?.details) {
      let errors: any = {};
      for (let item of error.details) {
        const label = item.path[0];
        const message = item.message;
        errors[label] = message;
      }
      setJoiError({ ...joiError, ...errors });
      return;
    }
    setJoiError(null);
    try {
      const res = await axios.put('/api/user/update', formValue);
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Successfully updated!');
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  const updatePassword = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const { error } = passwordSchema.validate(passwordForm, {
      abortEarly: false,
    });
    if (error?.details) {
      let errors: any = {};
      for (let item of error.details) {
        const label = item.path[0];
        const message = item.message;
        errors[label] = message;
      }
      setJoiError({ ...joiError, ...errors });
      return;
    }
    setJoiError(null);
    try {
      const res = await axios.put('/api/user/updatePassword', passwordForm);
      if (res.status === 200) {
        alert('Successfully updated password!');
        setIsShown(false);
        setPasswordForm({
          password: '',
          newPassword: '',
          repeatNewPassword: '',
        });
      }
    } catch (error) {
      console.log(error);
      alert('Error! Check your password');
    }
  };

  if (!user) return <LoginAlert />;
  return (
    <div className={styles.Customize}>
      <div className={styles.card}>
        <form className={styles.personalInfo} onSubmit={update}>
          <div className={styles.username}>
            <div className={styles.heading}>Username:</div>
            <input
              className={joiError?.username && styles.error}
              name='username'
              type='text'
              placeholder='Your username...'
              onChange={handleOnChange}
              value={formValue?.username}
            />
            {joiError?.username && (
              <span className={styles.errorMessage}>{joiError?.username}</span>
            )}
          </div>
          <div className={styles.profilePic}>
            <div className={styles.heading}>Profile pic:</div>
            <input
              className={joiError?.profilePic && styles.error}
              name='profilePic'
              type='text'
              placeholder='Profile pic url, only support for pinterest'
              onChange={handleOnChange}
              value={formValue?.profilePic}
            />
            {joiError?.profilePic && (
              <span className={styles.errorMessage}>
                {joiError?.profilePic}
              </span>
            )}
          </div>
          <div className={styles.customColor}>
            <div className={styles.heading}>Custom color:</div>
            <input
              name='customColor'
              type='color'
              onChange={handleOnChange}
              value={formValue?.customColor}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
        <form className={styles.personalInfo} onSubmit={updatePassword}>
          <div className={styles.password} onFocus={() => setIsShown(true)}>
            <div className={styles.heading}>Password:</div>
            <input
              className={joiError?.password && styles.error}
              name='password'
              type='password'
              placeholder='Password...'
              onChange={handleOnPasswordChange}
              value={passwordForm?.password}
            />
            {joiError?.password && (
              <span className={styles.errorMessage}>{joiError?.password}</span>
            )}
          </div>
          {isShown && (
            <>
              <div className={styles.newPassword}>
                <div className={styles.heading}>New password:</div>
                <input
                  className={joiError?.newPassword && styles.error}
                  name='newPassword'
                  type='password'
                  placeholder='New password...'
                  onChange={handleOnPasswordChange}
                  value={passwordForm?.newPassword}
                />
                {joiError?.newPassword && (
                  <span className={styles.errorMessage}>
                    {joiError?.newPassword}
                  </span>
                )}
              </div>
              <div className={styles.confirmPassword}>
                <div className={styles.heading}>Repeat new password:</div>
                <input
                  className={joiError?.repeatNewPassword && styles.error}
                  name='repeatNewPassword'
                  type='password'
                  placeholder='Repeat new password...'
                  onChange={handleOnPasswordChange}
                  value={passwordForm?.repeatNewPassword}
                />
                {joiError?.repeatNewPassword && (
                  <span className={styles.errorMessage}>
                    {joiError?.repeatNewPassword}
                  </span>
                )}
              </div>
            </>
          )}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

Customize.PageLayout = MainLayout;
Customize.Title = 'Customization - Aspher';
Customize.Description = 'User can customize their account';
