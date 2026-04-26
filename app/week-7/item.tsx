interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: (name: string) => void;
}

export default function Item({
  name,
  quantity,
  category,
  onSelect,
}: ItemProps) {
  return (
    <li
      onClick={() => onSelect(name)}
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-blue-50"
    >
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
