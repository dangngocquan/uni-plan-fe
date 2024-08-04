import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const AdminMajor = dynamic(() => import("@/src/components/Admin/Major"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function AdminMajorPage() {
  const router = useRouter();
  const { schoolId } = router.query;
  return <AdminMajor schoolId={schoolId ? schoolId.toString() : null} />;
}
