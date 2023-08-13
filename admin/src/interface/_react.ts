//import { AppProps } from "next/app";
export interface _children {
  children: React.ReactNode & {
    PageLayout?: React.ComponentType;
    Search?: boolean;
  };
}
// export type ComponentWithPageLayout = AppProps & {
//   Component: AppProps['Component'] & {
//     PageLayout?: React.ComponentType;
//   };
// };
