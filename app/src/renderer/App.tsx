/* eslint-disable no-buffer-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import LeftBar from "components/LeftBar";
import Item from "model/Item";
import { useEffect, useState } from "react";
import "./App.css";
import AllCategoriesPanel from "components/AllCategoriesPanel";

import fs from "fs";
import path from "path";
import { encryptData, decryptData } from "lib/crypto_utils";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [items, setItems] = useState<[Item]>([]);
  const [canWrite, setCanWrite] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [search, setSearch] = useState("");
  const savePath = "/Users/kamilkoziol/ziut";

  useEffect(() => {
    // Function to load items from the JSON file
    const loadItemsFromFile = () => {
      const filePath = path.join(savePath, "items.json");
      fs.readFile(filePath, "utf8", (err, encryptedData) => {
        if (err) {
          console.error("Failed to load items from file:", err);
        } else {
          try {
            const salt = new Buffer(
              fs.readFileSync(path.join(savePath, "salt"), "binary"),
              "binary"
            );
            const iv = new Buffer(
              fs.readFileSync(path.join(savePath, "iv"), "binary"),
              "binary"
            );
            const data = decryptData(encryptedData, "ziut", salt, iv);
            const parsedData = JSON.parse(data);

            setItems(parsedData);
            setCanWrite(true);
            if (parsedData.length > 0) {
              setSelectedItemIndex(0);
            }
            console.log("Items loaded from file successfully!");
          } catch (error) {
            console.error("Failed to parse items from file:", error);
          }
        }
      });
    };

    // Call the function to load items from file when the app starts
    loadItemsFromFile();
  }, []);

  useEffect(() => {
    // Function to write the items to a JSON file
    const writeItemsToFile = () => {
      const filePath = path.join(savePath, "items.json");
      const data = JSON.stringify(items, null, 2);
      const { encryptedData, salt, iv } = encryptData(data, "ziut");
      console.log(salt);
      console.log(iv);

      fs.writeFile(filePath, encryptedData, (err) => {
        if (err) {
          console.error("Failed to write items to file:", err);
        } else {
          console.log("Items written to file successfully!");
        }
      });

      fs.writeFileSync(path.join(savePath, "salt"), salt, null);
      fs.writeFileSync(path.join(savePath, "iv"), iv, null);
    };

    // Call the function to write items to file after items state is updated
    if (canWrite) {
      writeItemsToFile();
    }
  }, [canWrite, items]);

  return (
    <div className="main">
      <LeftBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AllCategoriesPanel
        showFavouritesOnly={false}
        search=""
        items={items}
        setItems={setItems}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
