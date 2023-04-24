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
      <div className="min-h-screen bg-gray-100 ">
        <div className="mx-auto max-w-screen-lg p-5 ">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4">
            <div>
              <h1 className="truncate text-3xl font-semibold text-gray-800 ">
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
                  className="flex items-center rounded-md border border-gray-800 px-4 py-1 text-lg text-gray-800 transition hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-800 disabled:opacity-50"
                >
                  Edit Home
                  <span className="pl-1 text-center  text-xl">
                    <BiEditAlt />
                  </span>
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={deleteHome}
                  className=" flex items-center rounded-md border  border-purple-700 px-4 py-1 text-center text-lg text-purple-800 transition hover:bg-purple-700 hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:bg-purple-700 disabled:text-white disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                  <span className="pl-1 text-center  text-xl">
                    <MdDeleteOutline />
                  </span>
                </button>
              </div>
            ) : null}
          </div>
          <div className="aspect-h-9 aspect-w-16 relative mt-6 overflow-hidden rounded-lg bg-gray-200 shadow-md">
            {home?.image ? (
              <Image
                src={home.image}
                alt={home.title}
                layout="fill"
                objectFit="cover"
              />
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-5 py-5  lg:grid-cols-3">
            <div className="col-span-0 space-y-10 lg:col-span-2 ">
              <div className=" flex items-center justify-between rounded-md border border-gray-300 bg-white px-5 py-3 shadow-sm ">
                <div className=" space-y-1 ">
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Bedrooms
                  </span>
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
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Bathrooms
                  </span>
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
                  <span className="hidden font-semibold text-gray-500 md:block">
                    SqFeet
                  </span>
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
                  <span className="hidden font-semibold text-gray-500 md:block">
                    Guests
                  </span>
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
                <h1 className="text-2xl font-bold text-gray-700 ">
                  About this house
                </h1>
                <p className=" text-lg text-gray-800  ">
                  {home?.description ?? ""}
                </p>
              </div>
            </div>
            <div className=" h-80 space-y-3 rounded-md bg-white p-5 py-10 shadow-md ">
              <div className="">
                <span className=" font-semibold text-gray-500 ">
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
                <span className=" font-semibold text-gray-500 ">Owner</span>
                <p className="mb-3 line-clamp-1 font-bold text-gray-700   ">
                  {home.ownerName ?? ""}
                </p>
              </div>
              <div className="">
                <span className=" font-semibold text-gray-500 ">Posted On</span>
                <p className="mb-3 line-clamp-1 font-medium text-gray-700   ">
                  {new Date(home.createdAt).toDateString() ?? ""}
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
                  className="flex w-full items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
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
            <p className=" py-5 text-2xl font-bold text-gray-700 ">
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
