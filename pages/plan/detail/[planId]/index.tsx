import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const PlanDetailPage = dynamic(() => import("@/src/components/PlanDetail"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomePlanDetailPage() {
  const router = useRouter();
  const { planId } = router.query;
  return (
    <div>
      <PlanDetailPage
        planId={planId ? planId.toString() : null}
      ></PlanDetailPage>
    </div>
  );
}
