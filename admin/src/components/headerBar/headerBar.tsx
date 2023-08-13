import s from './headerBar.module.scss';
import sidebarStyles from '../sideBar/sideBar.module.scss';

import FuzzySearch from '../FuzzySearch/FuzzySearch';
import { _setPassingSearchData } from '@/interface/_custom';

export default function HeaderBar({
  setPassingSearchData,
}: {
  setPassingSearchData: _setPassingSearchData;
}) {
  return (
    <header className={s.headerBar}>
      <button
        className={s.menu_icon_btn}
        onClick={() =>
          document.getElementsByClassName(sidebarStyles.Sidebar) &&
          document
            .getElementsByClassName(sidebarStyles.Sidebar)[0]
            .classList.toggle(sidebarStyles.open)
        }
      >
        <span className={s.menu_bar}></span>
        <span className={s.menu_bar} id={s.bar}></span>
        <span className={s.menu_bar}></span>
      </button>
      <div className={s.wrap}>
        <FuzzySearch setPassingSearchData={setPassingSearchData} />
      </div>
    </header>
  );
}
