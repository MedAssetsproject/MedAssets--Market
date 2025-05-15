import MyData from "@/components/MyData";
import AddData from "@/components/AddData";

export default function MyDataPage() {
  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <AddData />
      <MyData />
    </div>
  );
}
