import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import LeftBar from "components/LeftBar";
import Item from "model/Item";

import "./App.css";
import { useState } from "react";
import AllCategoriesPanel from "components/AllCategoriesPanel";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [items, setItems] = useState<[Item]>([
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
    new Item("Apple", "panpouran@gmail.com", "abcdefghac"),
  ]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

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
