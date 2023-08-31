import styles from './sideBar.module.scss';
import {
  AssignmentIcon,
  CustomizeIcon,
  DashboardIcon,
  FavoriteRoundedIcon,
} from '../icons';

const SideBarData = [
  {
    title: 'Home page',
    icon: <DashboardIcon className={styles.sidebarIcon} />,
    path: '/',
  },
  {
    title: 'Followed',
    icon: <FavoriteRoundedIcon className={styles.sidebarIcon} />,
    path: '/followed',
  },
  // {
  //   title: 'Nhận xét',
  //   icon: <CommentRoundedIcon className={styles.sidebarIcon} />,
  //   path: '/comment',
  // },
  {
    title: 'Customize',
    icon: <CustomizeIcon className={styles.sidebarIcon} />,
    path: '/customize',
  },
  // {
  //   title: 'Donation',
  //   icon: <VolunteerActivismIcon className={styles.sidebarIcon} />,
  //   path: '/donation',
  // },
  {
    title: 'Terms & condition',
    icon: <AssignmentIcon className={styles.sidebarIcon} />,
    path: '/terms',
  },
];

export default SideBarData;
