import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const UserMajorDetails = dynamic(() => import("@/src/components/MajorDetail"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function UserMajorDetailsPage() {
  const router = useRouter();
  const { majorId } = router.query;
  return <UserMajorDetails majorId={majorId ? majorId.toString() : null} />;
}
