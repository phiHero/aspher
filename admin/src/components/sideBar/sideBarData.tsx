import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { _SideBarData } from '../../interface/_custom';
import styles from './sideBar.module.scss';

export const Navigation: _SideBarData[] = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon className={styles.icon} />,
    path: '/',
  },
  {
    title: 'Analytics',
    icon: <ShowChartOutlinedIcon className={styles.icon} />,
    path: '/analytics',
  },
];
export const Film: _SideBarData[] = [
  {
    title: 'Add new episode',
    icon: <AddOutlinedIcon className={styles.icon} />,
    path: '/film/episode/add',
  },
  {
    title: 'Add a new film',
    icon: <AddCircleOutlineIcon className={styles.icon} />,
    path: '/film/add',
  },
  {
    title: 'Modify',
    icon: <ModeEditOutlinedIcon className={styles.icon} />,
    path: '/film/edit',
  },
  // {
  //   title: 'Find anime',
  //   icon: <ContentPasteSearchOutlinedIcon className={styles.icon} />,
  //   path: '/anime/find',
  // },
];
export const User: _SideBarData[] = [
  {
    title: 'Users management',
    icon: <PeopleAltOutlinedIcon className={styles.icon} />,
    path: '/user/manage',
  },
  {
    title: 'Find user',
    icon: <PersonSearchOutlinedIcon className={styles.icon} />,
    path: '/user/find',
  },
  {
    title: 'Create user',
    icon: <PersonAddAltOutlinedIcon className={styles.icon} />,
    path: '/user/create',
  },
];
