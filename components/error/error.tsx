import styles from './error.module.scss';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
export default function Error({
  message,
  height,
}: {
  message?: string;
  height?: string;
}) {
  return (
    <div
      className={styles.Error}
      style={{ height: height || 'calc(100vh - var(--header-height))' }}
    >
      <h1 className={styles.message}>
        <WarningRoundedIcon className={styles.icon} />{' '}
        <span className={styles.text}>
          {message || 'Sorry, có lỗi xảy ra vui lòng tải lại trang!'}
        </span>
      </h1>
    </div>
  );
}
