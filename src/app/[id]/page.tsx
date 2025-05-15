import { dataList } from "@/lib/data";
import Detail from "@/components/Detail";

export default function DetailPage({ params }: { params: { id: string } }) {
  const data = dataList.find((item) => item.id.toString() === params.id);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-gray-500 text-xl">数据未找到</div>
      </div>
    );
  }

  return <Detail data={data} />;
}
