/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import styles from "./LeftBar.module.scss";
import categoriesIcon from "../../assets/icons/folder-solid.svg";
import thrashIcon from "../../assets/icons/trash-solid-2.svg";
import favouritesIcon from "../../assets/icons/star-solid.svg";
import settingsIcon from "../../assets/icons/gear-solid.svg";

export interface LeftBarProps {
  selectedCategory: string;
  setSelectedCategory: any;
}

const data = [
  { name: "All categories", icon: categoriesIcon },
  { name: "Favoutires", icon: favouritesIcon },
  { name: "Thrash", icon: thrashIcon },
];

export default function LeftBar({
  selectedCategory,
  setSelectedCategory,
}: LeftBarProps) {
  return (
    <div className={styles.main}>
      <ul className={styles.main}>
        {data.map((val) => {
          return (
            <li
              className={selectedCategory === val.name ? styles.selected : ""}
              onClick={() => setSelectedCategory(val.name)}
            >
              <img src={val.icon} alt={val.name} width={24} height={24} />
              <h1>{val.name}</h1>
            </li>
          );
        })}

        <li style={{ marginTop: "auto", paddingBottom: "0.7rem" }}>
          <img src={settingsIcon} alt="Settings" width={24} height={24} />
          <h1>Settings</h1>
        </li>
      </ul>
    </div>
  );
}
