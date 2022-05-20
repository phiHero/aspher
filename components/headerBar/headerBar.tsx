import styles from './headerBar.module.scss';
import sidebarStyles from '../sideBar/sideBar.module.scss';

const HeaderBar = () => {
  return (
    <header className={styles.headerBar}>
      <button
        className={styles.menu_icon_btn}
        onClick={() =>
          document.getElementsByClassName(sidebarStyles.Sidebar) &&
          document
            .getElementsByClassName(sidebarStyles.Sidebar)[0]
            .classList.toggle(sidebarStyles.open)
        }
      >
        <span className={styles.menu_bar}></span>
        <span className={styles.menu_bar} id={styles.bar}></span>
        <span className={styles.menu_bar}></span>
      </button>
      <div className={styles.logo} unselectable='on'>
        <i>A</i>sphero
      </div>
    </header>
  );
};
export default HeaderBar;
