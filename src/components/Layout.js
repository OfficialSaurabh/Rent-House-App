import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { useSession, signOut } from "next-auth/react";
import AuthModal from "./AuthModal";
import { Menu, Transition } from "@headlessui/react";
import Footer from "./Footer";
import Logo from "../../public/logo.png";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineSparkles, HiOutlineChevronDown } from "react-icons/hi";
import { BiBuildingHouse } from "react-icons/bi";

const menuItems = [
  {
    label: "List a new home",
    icon: AiOutlinePlus,
    href: "/create",
  },
  {
    label: "My homes",
    icon: AiOutlineHome,
    href: "/homes",
  },
  {
    label: "Favorites",
    icon: AiOutlineHeart,
    href: "/favorites",
  },
  {
    label: "Logout",
    icon: AiOutlineLogout,
    onClick: signOut,
  },
];

const Layout = ({ children = null }) => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoadingUser = status === "loading";

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>RentHouse</title>
        <meta
          name="title"
          content="Learn how to Build a Fullstack App with Next.js, PlanetScale & Prisma | The Modern Dev"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 h-16 w-full bg-white shadow-md  ">
          <div className="container mx-auto h-full  lg:max-w-7xl">
            <div className="flex h-full items-center justify-between space-x-4 px-4">
              <Link legacyBehavior href="/">
                <p className="flex items-center cursor-pointer  space-x-1">
                  <Image
                    src={Logo}
                    alt="RentHouse"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  {/* <BiBuildingHouse className="shrink-0 w-8 h-8 text-purple-800" /> */}
                  <span className="text-2xl cursor-pointer font-semibold tracking-wide text-purple-800">
                    RentHouse
                  </span>
                </p>
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    session?.user ? router.push("/create") : openModal();
                  }}
                  // className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md"
                  className="hidden rounded-md px-3  py-2 text-center text-purple-700 outline outline-1 outline-purple-400 hover:bg-purple-200 sm:block"
                >
                  List your home
                </button>
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] animate-pulse rounded-md bg-gray-200" />
                ) : user ? (
                  <Menu as="div" className="relative z-50 text-gray-700 ">
                    <Menu.Button className="group flex items-center space-x-px">
                      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name || "Avatar"}
                            fill
                          />
                        ) : (
                          <AiOutlineUser className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <HiOutlineChevronDown className="h-5 w-5 shrink-0 text-gray-500 group-hover:text-current" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-1 w-72 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="mb-2 flex items-center space-x-2 px-4 py-4">
                          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                            {user?.image ? (
                              <Image
                                src={user?.image}
                                alt={user?.name || "Avatar"}
                                layout="fill"
                              />
                            ) : (
                              <AiOutlineUser className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col truncate">
                            <span>{user?.name}</span>
                            <span className="text-sm text-gray-500">
                              {user?.email}
                            </span>
                          </div>
                        </div>

                        <div className="py-2">
                          {menuItems.map(
                            ({ label, href, onClick, icon: Icon }) => (
                              <div
                                key={label}
                                className="px-2 last:mt-2 last:border-t last:pt-2"
                              >
                                <Menu.Item>
                                  {href ? (
                                    <Link legacyBehavior href={href}>
                                      <a className="flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-purple-100">
                                        <Icon className="h-5 w-5 shrink-0 text-gray-500" />
                                        <span>{label}</span>
                                      </a>
                                    </Link>
                                  ) : (
                                    <button
                                      className="flex w-full items-center space-x-2 rounded-md px-4 py-2 hover:bg-purple-100"
                                      onClick={onClick}
                                    >
                                      <Icon className="h-5 w-5 shrink-0 text-gray-500" />
                                      <span>{label}</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            )
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="ml-4 rounded-md bg-purple-600 px-3 py-2 text-white transition hover:bg-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="">
          <div className="">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>

        <AuthModal show={showModal} onClose={closeModal} />
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;
