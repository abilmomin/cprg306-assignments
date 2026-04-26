import NewItem from "./new-item";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Shopping List
      </h1>
      <div className="max-w-2xl mx-auto">
        <NewItem />
      </div>
    </main>
  );
}
