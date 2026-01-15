export const dynamic = "force-dynamic";

const aboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div>
      <h1>This is about page</h1>
    </div>
  );
};

export default aboutPage;
