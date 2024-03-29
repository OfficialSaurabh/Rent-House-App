import Layout from "../components/Layout";
import Grid from "../components/Grid";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // Get all homes from the authenticated user
  const homes = await prisma.home.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
  });

  // Pass the data to the Homes component
  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
    },
  };
}

const Homes = ({ homes = [] }) => {
  return (
    <Layout>
      <section className="min-h-screen bg-gray-100 ">
        <div className="mx-auto w-3/4 border border-none py-10">
          <h1 className="text-xl font-medium text-gray-800">Your listings</h1>
          <p className="text-gray-500">
            Manage your homes and update your listings
          </p>
          <div className="container  flex justify-center">
            <Grid homes={homes} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homes;
