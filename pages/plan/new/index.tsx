import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

const inter = Inter({ subsets: ["latin"] });

const PlanNewPage = dynamic(() => import("@/src/components/NewPlan"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomePlanNewPage() {
  return (
    <div>
      <PlanNewPage></PlanNewPage>
    </div>
  );
}
