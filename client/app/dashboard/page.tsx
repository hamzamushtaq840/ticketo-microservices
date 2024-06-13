import { checkLogin } from "../lib/data";

export default async function Page() {
  let isLoggedIn = await checkLogin();
  return <div>Page</div>;
}
