"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData);

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Shopping List
      </h1>
      <div className="max-w-2xl mx-auto">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
