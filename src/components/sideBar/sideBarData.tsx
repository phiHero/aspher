import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styles from './sideBar.module.scss';

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
    icon: <AutoFixHighIcon className={styles.sidebarIcon} />,
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
