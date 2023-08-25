// import s from "./terms.module.scss";

import MainLayout from '@/layout/mainLayout/mainLayout';
import Error from '@/components/error/error';

export default function Terms() {
  return <Error message='This feature is currently in development!' />;
}
Terms.PageLayout = MainLayout;
Terms.Title = 'Terms and conditions - Aspher';
Terms.Description = 'Terms and conditions';
