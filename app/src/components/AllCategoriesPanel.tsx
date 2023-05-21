/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Item from "model/Item";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./AllCategoriesPanel.module.scss";
import categoriesIcon from "../../assets/icons/folder-solid.svg";

export interface AllCategoriesPanelProps {
  showFavouritesOnly: boolean;
  search: string;
  items: [Item];
  setItems: React.Dispatch<React.SetStateAction<[Item]>>;
  selectedItemIndex: number;
  setSelectedItemIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function AllCategoriesPanel({
  showFavouritesOnly,
  search,
  items,
  setItems,
  selectedItemIndex,
  setSelectedItemIndex,
}: AllCategoriesPanelProps) {
  const [changingElement, setChangingElement] = useState<Item>({
    ...items[0],
  });

  useEffect(() => setChangingElement({ ...items[selectedItemIndex] }), [items]);

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ): void {
    setChangingElement((prev) => {
      const newItem = { ...prev };
      newItem[propertyName] = e.target.value;
      return newItem;
    });
  }

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <h1>Items</h1>
        <ul>
          {items.map((item, i) => {
            return (
              <li
                className={classNames(
                  styles.item,
                  i === selectedItemIndex ? styles.selected : styles.unselected
                )}
                onClick={() => {
                  setSelectedItemIndex(i);
                  // TODO: Add confirmation
                  setChangingElement({ ...items[i] });
                }}
                key={i}
              >
                <img src={categoriesIcon} alt="ziut" width={32} height={32} />
                <div className={styles.right_from_icon}>
                  <h1>{item.name}</h1>
                  <h2>{item.username}</h2>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.right}>
        <ul>
          <li className={styles.default_item}>
            <span>name</span>
            <input
              type="text"
              value={changingElement.name}
              onChange={(e) => handleOnChange(e, "name")}
            />
          </li>
          <li className={styles.default_item}>
            <span>username</span>
            <input
              type="text"
              value={changingElement.username}
              onChange={(e) => handleOnChange(e, "username")}
            />
          </li>
          <li className={styles.default_item}>
            <span>password</span>
            <input
              type="password"
              value={changingElement.password}
              onChange={(e) => handleOnChange(e, "password")}
            />
          </li>
          <li className={styles.default_item}>
            <span>website</span>
            <input
              type="text"
              value={changingElement.website}
              onChange={(e) => handleOnChange(e, "website")}
            />
          </li>
          <li className={styles.default_item}>
            <span>totp</span>
            <input
              type="text"
              value={changingElement.totp}
              onChange={(e) => handleOnChange(e, "totp")}
            />
          </li>
          <li className={classNames(styles.default_item, styles.removeButton)}>
            <span>Remove</span>
          </li>
          <li
            className={classNames(styles.default_item, styles.saveButton)}
            onClick={() => {
              setItems((prevItems) => {
                const newItems = prevItems.slice();
                newItems[selectedItemIndex] = { ...changingElement };
                return newItems;
              });
            }}
          >
            <span>Save</span>
          </li>
        </ul>
      </div>
    </div>
  );
}