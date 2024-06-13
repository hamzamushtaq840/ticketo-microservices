import { checkLogin } from "../lib/data";
import LogoutButton from "../ui/LogoutButton";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkLogin();

  return (
    <div className="flex h-screen flex-col">
      <LogoutButton />
      <div>{children}</div>
    </div>
  );
}
