
import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Search from "../components/Search";
import CardSwiper from "../components/CardSwiper";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
  const [homes, setHomes] = useState([]);
  // loading state
  const [loading, setLoading] = useState(true);
  // filter state
  const [filter, setFilter] = useState({});
  useEffect(() => {
    axios.get(`/api/get-homes?${filter}`).then(res => {
      setHomes(res.data);
      setLoading(false);
    });
  }, [filter]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-100 ">
          <div className="mx-auto max-w-screen-lg p-5 ">
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4">
              <div>
                <h1 className="truncate text-2xl font-semibold text-gray-800 ">
                  Loading...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        <section className="min-h-screen bg-gray-100 ">
          <div className="mx-auto w-3/4 border border-none py-10">
            <h1 className="text-2xl font-medium text-gray-800 sm:text-4xl">
              Top-rated places to stay
            </h1>
            <p className="text-gray-500">
              Explore some of the best places in the world
            </p>
            <Search />
            <div className="flex justify-center lg:flex-none  ">
              <Grid homes={homes} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
