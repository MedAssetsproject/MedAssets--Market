import Market from "@/components/Market";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="text-center mt-16 mb-8">
        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          MEDASSETS
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 font-normal">
          Take our own biological data benefits back!
        </p>
      </div>
      <Market />
    </main>
  );
}
