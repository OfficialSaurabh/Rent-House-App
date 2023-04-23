import Image from "next/legacy/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiBed, BiBath, BiArea, BiEditAlt } from "react-icons/bi";
import { BsStars, BsTriangleFill, BsPeople, BsTelephone } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import CardSwiper from "../../components/CardSwiper";
import AuthModal from "../../components/AuthModal";

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
    fallback: true,
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

  const user = session?.user;
  // const isLoadingUser = status === "loading";

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
              <h1 className="text-3xl font-semibold truncate text-gray-800 ">
                {home?.title ?? ""}
              </h1>
              <p className="text-gray-700">{home?.address ?? ""}</p>
            </div>
            {isOwner ? (
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => router.push(`/homes/${home.id}/edit`)}
                  className="px-4 py-1 flex items-center text-lg border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded-md disabled:text-gray-800 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Edit Home
                  <span className="text-xl pl-1  text-center">
                    <BiEditAlt />
                  </span>
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={deleteHome}
                  className=" flex text-center text-lg items-center  rounded-md border border-purple-700 text-purple-800 hover:bg-purple-700 hover:text-white focus:outline-none transition disabled:bg-purple-700 disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1"
                >
                  {deleting ? "Deleting..." : "Delete"}
                  <span className="text-xl pl-1  text-center">
                    <MdDeleteOutline />
                  </span>
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
          <div className="grid lg:grid-cols-3 grid-cols-1 py-5  gap-5">
            <div className="lg:col-span-2 col-span-0 space-y-10 ">
              <div className=" flex justify-between shadow-sm px-5 py-3 border border-gray-300 rounded-md bg-white ">
                <div className=" space-y-1 ">
                  <span className="font-semibold text-gray-500">Bedrooms</span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiBed />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.beds ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="font-semibold text-gray-500">Bathrooms</span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiBath />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.baths ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="font-semibold text-gray-500">SqFeet</span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BiArea />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.sqfeet ?? 0}
                    </span>
                  </div>
                </div>
                <div className=" space-y-1 ">
                  <span className="font-semibold text-gray-500">Guests</span>
                  <div className=" flex items-center">
                    <span className="text-xl text-gray-400 ">
                      <BsPeople />
                    </span>
                    <span className="px-1 text-xl font-semibold text-gray-700">
                      {home.guests ?? 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-5">
                <h1 className="text-2xl text-gray-700 font-bold ">
                  About this house
                </h1>
                <p className=" text-lg text-gray-800  ">
                  {home?.description ?? ""}
                </p>
              </div>
            </div>
            <div className=" bg-white p-5 h-64 rounded-md shadow-md space-y-5 ">
              <div className="">
                <span className=" text-gray-500 font-semibold ">
                  Rent Price
                </span>
                <p className="mb-2 text-xl font-bold tracking-tight text-purple-700 ">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(home.price ?? 0)}{" "}
                  <span className=" text-sm font-normal text-gray-500">
                    /month
                  </span>
                </p>
              </div>
              <div className="">
                <span className=" text-gray-500 font-semibold ">Owner</span>
                <p className="mb-3 font-bold text-gray-700 line-clamp-1   ">
                  {home.ownerName ?? ""}
                </p>
              </div>
              <div className="p-5">
                {/* <button
                  type="button"
                  className=" rounded-md  px-3 py-2 text-center text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200"
                >
                  Add to Favorites
                </button> */}
                {/* <a href={`tel:${home.contact}`} className="">
                  <button
                    type="button"
                    className="px-3 py-2 w-full flex justify-center items-center rounded-md bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white transition"
                  >
                    <span className="px-2 ">
                      <BsTelephone />
                    </span>
                    Contact Owner
                  </button>
                </a> */}
                <button
                  onClick={() => {
                    session?.user
                      ? router.push(`tel:${home.contact}`)
                      : openModal();
                  }}
                  type="button"
                  className="px-3 py-2 w-full flex justify-center items-center rounded-md bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white transition"
                >
                  <span className="px-2 ">
                    <BsTelephone />
                  </span>
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
          <div className=" mt-10 ">
            <p className=" text-2xl text-gray-700 font-bold py-5 ">
              Similar Houses
            </p>
            <CardSwiper />
          </div>
          <AuthModal show={showModal} onClose={closeModal} />
        </div>
      </div>
    </Layout>
  );
};
export default ListedHome;
