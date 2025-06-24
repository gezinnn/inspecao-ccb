import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center gap-4 mt-10">
      <Link href="/forms"><Button>Forms</Button></Link>
      <Link href="/voluntarios"><Button>Voluntários</Button></Link>
      <Link href="/igrejas"><Button>Igrejas</Button></Link>
    </div>
  );
}
