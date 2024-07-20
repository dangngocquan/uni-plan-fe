import { Inter } from "next/font/google";
import MainLayout from "@/src/components/layouts/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <MainLayout>
        <h1>a</h1>
      </MainLayout>
    </div>
  );
}
