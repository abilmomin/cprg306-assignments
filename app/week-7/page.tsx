"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    const itemWithId: ItemType = {
      id: `${Date.now()}`,
      ...newItem,
    };
    setItems([...items, itemWithId]);
  };

  const handleItemSelect = (itemName: string) => {
    // Clean up the item name by removing emojis and sizing information
    const cleanedName = itemName
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF]|[\u2300-\u23FF]|[\u2600-\u27FF]|[\u1F300-\u1F9FF])/g,
        "",
      )
      .split(",")[0]
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Shopping List & Meal Ideas
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
