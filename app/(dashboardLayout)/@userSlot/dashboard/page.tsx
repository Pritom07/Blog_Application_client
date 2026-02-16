import { redirect } from "next/navigation";

const userDashboardPage = () => {
  redirect("/dashboard/create-blog");
};

export default userDashboardPage;
