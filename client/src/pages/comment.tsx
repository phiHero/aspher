// Styles
import MainLayout from '../layout/mainLayout/mainLayout';
import Error from '../components/error/error';

export default function Comment() {
  return <Error message='This feature is currently in development!' />;
}

Comment.PageLayout = MainLayout;
