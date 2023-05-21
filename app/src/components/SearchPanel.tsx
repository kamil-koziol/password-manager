/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from "./SearchPanel.module.scss";

export interface SearchPanelProps {
  search: string;
  setSearch: any;
}

export default function SearchPanel({
  search,
  setSearch,
}: LeftBarProps) {
  return (
    <div className={styles.main}>
    </div>
  );
}
