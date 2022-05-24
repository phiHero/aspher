import styles from './loginAlert.module.scss';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
export default function LoginAlert({ height }: { height?: string }) {
  return (
    <div
      className={styles.LoginAlert}
      style={{ height: height || 'calc(100vh - var(--header-height))' }}
    >
      <h1 className={styles.message}>
        <WarningRoundedIcon className={styles.icon} />
        <span className={styles.text}>
          Bạn cần đăng nhập để sử dụng tính năng này!
        </span>
      </h1>
    </div>
  );
}
