import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

const inter = Inter({ subsets: ["latin"] });

const SchoolPage = dynamic(() => import("@/src/components/School"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomeSchoolPage() {
  return (
    <div>
      <SchoolPage></SchoolPage>
    </div>
  );
}