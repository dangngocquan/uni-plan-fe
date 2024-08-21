import Loading from "@/src/components/Loading";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const UserPlanNew = dynamic(() => import("@/src/components/NewPlan"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function UserPlanNewPage() {
  const router = useRouter();
  const { majorId } = router.query;
  return <UserPlanNew majorId={majorId ? majorId.toString() : null} />;
}
