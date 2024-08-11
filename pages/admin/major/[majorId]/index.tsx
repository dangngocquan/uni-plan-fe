import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const AdminMajorDetails = dynamic(
  () => import("@/src/components/Admin/MajorDetail"),
  {
    ssr: false,
    loading: () => <Loading></Loading>,
  }
);

export default function AdminMajorDetailsPage() {
  const router = useRouter();
  const { majorId } = router.query;
  return <AdminMajorDetails majorId={majorId ? majorId.toString() : null} />;
}
