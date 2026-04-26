interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">Category: {category}</p>
      </div>
      <div className="ml-4 text-center">
        <p className="text-sm text-gray-500">Quantity</p>
        <p className="text-2xl font-bold text-gray-800">{quantity}</p>
      </div>
    </li>
  );
}
