import { Inter } from "next/font/google";
import MainLayout from "@/src/components/layouts/MainLayout";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

const inter = Inter({ subsets: ["latin"] });

const LandingPage = dynamic(() => import("@/src/components/Landing"), {
  ssr: false,
  loading: () => <Loading></Loading>,
});

export default function Home() {
  return (
    <div>
      <LandingPage></LandingPage>
    </div>
  );
}