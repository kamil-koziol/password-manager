/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Item from "model/Item";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import styles from "./AllCategoriesPanel.module.scss";
import categoriesIcon from "../../assets/icons/folder-solid.svg";
import keyIcon from "../../assets/icons/key-solid.svg";
import keyWhiteIcon from "../../assets/icons/key-white-solid.svg";
import copyIcon from "../../assets/icons/copy-solid.svg";
import eyeSlashIcon from "../../assets/icons/eye-slash-solid.svg";
import eyeIcon from "../../assets/icons/eye-solid.svg";
import favouritesIcon from "../../assets/icons/star-solid.svg";
import notFavouritesIcon from "../../assets/icons/star-regular.svg";

const { clipboard } = require("electron");

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
  const [isShowingPassword, setIsShowingPassowrd] = useState(false);

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
          {items
            .filter(
              (item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.username.toLowerCase().includes(search.toLowerCase()) ||
                item.website.toLowerCase().includes(search.toLowerCase())
            )
            .filter((item) => {
              if (showFavouritesOnly) {
                return item.isFavourite;
              }
              return true;
            })
            .map((item, i) => {
              return (
                <li
                  className={classNames(
                    styles.item,
                    i === selectedItemIndex
                      ? styles.selected
                      : styles.unselected
                  )}
                  onClick={() => {
                    setSelectedItemIndex(i);
                    // TODO: Add confirmation
                    setChangingElement({ ...items[i] });
                  }}
                  key={i}
                >
                  <div className={styles.item_left}>
                    <img
                      src={i === selectedItemIndex ? keyWhiteIcon : keyIcon}
                      alt="ziut"
                      width={32}
                      height={32}
                    />
                    <div className={styles.right_from_icon}>
                      <h1>{item.name}</h1>
                      <h2>{item.username}</h2>
                    </div>
                  </div>
                  <img
                    src={item.isFavourite ? favouritesIcon : notFavouritesIcon}
                    width={24}
                    height={24}
                    alt="fav"
                    onClick={() => {
                      setItems((prevItems) => {
                        const newItems = prevItems.slice();
                        newItems[i].isFavourite = !newItems[i].isFavourite;
                        return newItems;
                      });
                    }}
                  />
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
          <li className={styles.password_item}>
            <div className={styles.password_left}>
              <span>password</span>
              <input
                type={isShowingPassword ? "text" : "password"}
                value={changingElement.password}
                onChange={(e) => handleOnChange(e, "password")}
                id="password"
              />
            </div>
            <div className={styles.password_right}>
              <img
                src={isShowingPassword ? eyeSlashIcon : eyeIcon}
                alt="copy"
                width={24}
                height={24}
                onClick={() => {
                  setIsShowingPassowrd(!isShowingPassword);
                }}
              />
              <img
                src={copyIcon}
                alt="copy"
                width={24}
                height={24}
                onClick={() => {
                  toast.success("Copied to clipboard", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });

                  clipboard.writeText(
                    document.getElementById("password")!.value
                  );
                }}
              />
            </div>
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
          <li
            className={classNames(styles.default_item, styles.removeButton)}
            onClick={() => {
              setItems((prevItems) => {
                const newItems = prevItems.slice();
                newItems.splice(selectedItemIndex, 1);
                return newItems;
              });
            }}
          >
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
