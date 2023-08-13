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
          {message || 'Sorry, there is an error, please refresh the page!'}
        </span>
      </h1>
    </div>
  );
}
