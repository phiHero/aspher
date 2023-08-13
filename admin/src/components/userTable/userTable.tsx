import styles from './userTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { _user } from '@/interface/_custom';

export default function UserTable({ newMember }) {
  return (
    <Paper className={styles.scroll}>
      <TableContainer component={Paper} className={styles.Table}>
        <Table stickyHeader aria-label='sticky table' className={styles.table}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableCell} id={styles.id}>
                User ID
              </TableCell>
              <TableCell className={styles.tableCell}>Profile image</TableCell>
              <TableCell className={styles.tableCell}>Username</TableCell>
              <TableCell className={styles.tableCell}>Email</TableCell>
              <TableCell className={styles.tableCell}>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newMember?.map((item:_user) => (
              <TableRow key={item._id}>
                <TableCell className={styles.tableCell}>
                  <Tooltip title='Copy'>
                    <IconButton
                      className={styles.icon}
                      onClick={() => navigator.clipboard.writeText(item._id)}
                    >
                      <ContentCopyOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.imgBorder}>
                    <Image
                      className={styles.image}
                      src={item.profilePic ? item.profilePic : '/unknown.png'}
                      width={40}
                      height={40}
                      alt='profilePic'
                    />
                  </div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {item.username}
                </TableCell>
                <TableCell className={styles.tableCell}>{item.email}</TableCell>
                <TableCell className={styles.tableCell}>
                  {item.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
