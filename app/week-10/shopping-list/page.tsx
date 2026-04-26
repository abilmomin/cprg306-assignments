"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import { addItem, getItems } from "../_services/shopping-list-service";

interface ItemType {
  id: string;
  name: string;
  quantity: number;
  category: string;
}

export default function Page() {
  const { user, loading } = useUserAuth();
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (!user) {
      return;
    }

    const userItems = await getItems(user.uid);
    setItems(userItems);
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const handleAddItem = async (newItem: {
    name: string;
    quantity: number;
    category: string;
  }) => {
    if (!user) {
      return;
    }

    const id = await addItem(user.uid, newItem);
    const itemWithId: ItemType = {
      id,
      ...newItem,
    };
    setItems((currentItems) => [...currentItems, itemWithId]);
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-gray-700">Checking your session...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Please log in to view your shopping list
          </h1>
          <Link
            href="/week-10"
            className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Return to Login
          </Link>
        </div>
      </main>
    );
  }

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
