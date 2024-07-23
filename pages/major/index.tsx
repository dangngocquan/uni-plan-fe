import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

const inter = Inter({ subsets: ["latin"] });

const MajorPage = dynamic(() => import("@/src/components/Major"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomeMajorPage() {
  return (
    <div>
      <MajorPage schoolId={null}></MajorPage>
    </div>
  );
}
