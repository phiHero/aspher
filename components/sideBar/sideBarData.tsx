import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import AssignmentIcon from '@mui/icons-material/Assignment';
import styles from './sideBar.module.scss';

const SideBarData = [
  {
    title: 'Trang chủ',
    icon: <DashboardIcon className={styles.sidebarIcon} />,
    path: '/',
  },
  {
    title: 'Yêu thích',
    icon: <FavoriteRoundedIcon className={styles.sidebarIcon} />,
    path: '/liked',
  },
  {
    title: 'Nhận xét',
    icon: <CommentRoundedIcon className={styles.sidebarIcon} />,
    path: '/comment',
  },
  {
    title: 'Giao diện',
    icon: <AutoFixHighIcon className={styles.sidebarIcon} />,
    path: '/customize',
  },
  {
    title: 'Donation',
    icon: <VolunteerActivismIcon className={styles.sidebarIcon} />,
    path: '/donation',
  },
  {
    title: 'Điều khoản',
    icon: <AssignmentIcon className={styles.sidebarIcon} />,
    path: '/terms',
  },
];

export default SideBarData;
