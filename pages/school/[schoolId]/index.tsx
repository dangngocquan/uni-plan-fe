import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const MajorPage = dynamic(() => import("@/src/components/Major"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function HomeMajorPage() {
  const router = useRouter();
  const { schoolId } = router.query;
  return (
    <div>
      <MajorPage
        schoolId={schoolId ? schoolId.toString() : null}
      ></MajorPage>
    </div>
  );
}
