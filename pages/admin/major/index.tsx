import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AdminMajor = dynamic(() => import("@/src/components/Admin/Major"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function AdminMajorPage() {
  return <AdminMajor schoolId={null} />;
}
