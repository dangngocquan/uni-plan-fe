import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

const inter = Inter({ subsets: ["latin"] });

const PlanPage = dynamic(() => import("@/src/components/Plan"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomePlanPage() {
  return (
    <div>
      <PlanPage></PlanPage>
    </div>
  );
}
