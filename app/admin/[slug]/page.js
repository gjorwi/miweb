import { notFound } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Panel privado | Jorwi Garcia",
  robots: { index: false, follow: false },
};

export default async function PrivateAdminPage({ params }) {
  const { slug } = await params;
  const privateSlug = process.env.ADMIN_ROUTE_SLUG;

  if (!privateSlug || slug !== privateSlug) notFound();

  return <AdminPanel />;
}
