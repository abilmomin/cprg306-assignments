"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const isNameInvalid = nameTouched && (name.length === 0 || name.length < 2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || name.length < 2) {
      alert("Please enter a valid item name (at least 2 characters).");
      return;
    }

    const item = {
      name,
      quantity,
      category,
    };

    console.log(item);
    alert(
      `Item added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`,
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  const isFormValid = name.length >= 2;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Item
      </h2>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            isNameInvalid
              ? "border-red-500 focus:ring-red-500 bg-red-50"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Enter item name"
        />
        {isNameInvalid && (
          <p className="text-red-500 text-sm mt-2">
            Item name must be at least 2 characters long.
          </p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="quantity"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          min="1"
          max="99"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
          isFormValid
            ? "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Add Item
      </button>

      {!isFormValid && (
        <p className="text-gray-500 text-xs mt-3 text-center">
          Please fill in all required fields correctly
        </p>
      )}
    </form>
  );
}
