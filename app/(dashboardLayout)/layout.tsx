import DashboardLayout from "@/components/layout/dashboardLayout";

const DashBoardlayoutPage = ({
  adminSlot,
  userSlot,
}: {
  adminSlot: React.ReactNode;
  userSlot: React.ReactNode;
}) => {
  return (
    <div>
      <DashboardLayout adminSlot={adminSlot} userSlot={userSlot} />
    </div>
  );
};

export default DashBoardlayoutPage;
