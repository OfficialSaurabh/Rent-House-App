import Image from "next/legacy/image";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { BsStars, BsTriangleFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import {MdDeleteOutline} from "react-icons/md";
import CardSwiper from "../../components/CardSwiper";

// Instantiate Prisma Client
const prisma = new PrismaClient();

export async function getStaticPaths() {
  // Get all the homes IDs from the database
  const homes = await prisma.home.findMany({
    select: { id: true },
  });

  return {
    paths: homes.map(home => ({
      params: { id: home.id },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  // Get the current home from the database
  const home = await prisma.home.findUnique({
    where: { id: params.id },
  });

  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home)),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

const ListedHome = (home = null) => {
  const { data: session } = useSession();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const owner = await axios.get(`/api/homes/${home.id}/owner`);
          setIsOwner(owner?.id === session.user.id);
        } catch (e) {
          setIsOwner(false);
        }
      }
    })();
  }, [session?.user]);

  // Retrieve the Next.js router
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const deleteHome = async () => {
    let toastId;
    try {
      toastId = toast.loading("Deleting...");
      setDeleting(true);
      // Delete home from DB
      await axios.delete(`/api/homes/${home.id}`);
      // Redirect user
      toast.success("Successfully deleted", { id: toastId });
      router.push("/homes");
    } catch (e) {
      console.log(e);
      toast.error("Unable to delete home", { id: toastId });
      setDeleting(false);
    }
  };

  // Fallback version
  if (router.isFallback) {
    return "Loading...";
  }
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen ">
        <div className="max-w-screen-lg mx-auto p-5 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
            <div>
              <h1 className="text-2xl font-semibold truncate text-gray-800 ">
                {home?.title ?? ""}
              </h1>
              <ol className="inline-flex items-center space-x-1 text-gray-700">
                <li>
                  <span>{home?.guests ?? 0} guests</span>
                  <span aria-hidden="true"> · </span>
                </li>
                <li>
                  <span>{home?.beds ?? 0} beds</span>
                  <span aria-hidden="true"> · </span>
                </li>
                <li>
                  <span>{home?.baths ?? 0} baths</span>
                </li>
                <li>
                  <span>{home?.sqfeet ?? 0} sqfeet</span>
                </li>
              </ol>
              <p className="text-gray-700">{home?.address ?? ""}</p>
            </div>
            {isOwner ? (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => router.push(`/homes/${home.id}/edit`)}
                  className="px-4 py-1 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={deleteHome}
                  className=" flex text-center   rounded-md border border-purple-700 text-purple-800 hover:bg-purple-700 hover:text-white focus:outline-none transition disabled:bg-purple-700 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
                >
                  {deleting ? "Deleting..." : "Delete"}
                  {/* <span className="text-xl  text-center"><MdDeleteOutline/></span> */}
                </button>
              </div>
            ) : null}
          </div>
          <div className="mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden">
            {home?.image ? (
              <Image
                src={home.image}
                alt={home.title}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </div>
          <div className=" grid grid-cols-1 grid-flow-row md:grid-cols-2 py-5 gap-10  ">
            <div className="">
              <h1 className="text-2xl text-gray-700 font-bold ">Overview</h1>
              <p className=" text-lg text-gray-800 ">
                {home?.description ?? ""}
              </p>
            </div>
            <div className=" bg-white p-5 lg:p-10 rounded-md shadow-md ">
              <p className="mb-2 text-xl font-bold tracking-tight text-purple-700 ">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(home.price ?? 0)}{" "}
                <span className=" text-sm font-normal text-gray-500">
                  /month
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-700 line-clamp-1   ">
                {home.address ?? ""}
              </p>
              <div className="flex flex-wrap justify-start gap-5 lg:gap-10 py-3">
                <p className="flex items-center py-2   ">
                  <span className="text-xl text-purple-800 ">
                    <BiBed />
                  </span>
                  <span className="px-1 text-lg text-gray-700">
                    {home.beds ?? 0} Beds
                  </span>
                </p>
                <p className="flex items-center   ">
                  <span className="text-xl text-purple-800 ">
                    <BiBath />
                  </span>
                  <span className="px-1 text-lg text-gray-700">
                    {home.baths ?? 0} Bathrooms
                  </span>
                </p>
                <p className=" flex items-center   ">
                  <span className="text-xl text-purple-800 ">
                    <BiArea />
                  </span>
                  <span className="px-1 text-lg text-gray-700">
                    {" "}
                    {home.sqfeet ?? 0} Sqfeet
                  </span>
                </p>
              </div>
              <div className="py-5">
                <button
                  type="button"
                  className=" rounded-md  px-3 py-2 text-center text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200"
                >
                  Add to Favorites
                </button>
                <button
                  type="button"
                  className="ml-4 px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white transition"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-10 ">
                <p className=" text-2xl text-gray-700 font-bold py-5 ">Similar Houses</p>
            <CardSwiper />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ListedHome;
