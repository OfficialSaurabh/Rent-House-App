// import Image from 'next/image'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1>Rent House</h1>
//     </main>
//   )
// }

import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Search from "../components/Search";
import CardSwiper from "../components/CardSwiper";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [homes, setHomes] = useState([]);
  // loading state
  const [loading, setLoading] = useState(true);
  // filter state
  const [filter, setFilter] = useState({
    beds: "",
    upperprice: "",
    lowerprice: "",
    locality: "",
  });
  useEffect(() => {
    console.log(filter);
    axios.get(`/api/get-homes?beds=${filter.beds}&lowerprice=${filter.lowerprice}&&upperprice=${filter.upperprice}&locality=${filter.locality}`).then(res => {
      setHomes(res.data);
      setLoading(false);
    });
  }, [filter]);

  if (loading) {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen ">
          <div className="max-w-screen-lg mx-auto p-5 ">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4">
              <div>
                <h1 className="text-2xl font-semibold truncate text-gray-800 ">
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
        <section className="bg-gray-100 min-h-screen ">
          <div className="mx-auto w-3/4 border border-none py-10">
            <h1 className="font-medium text-gray-800 sm:text-4xl text-2xl">
              Top-rated places to stay
            </h1>
            <p className="text-gray-500">
              Explore some of the best places in the world
            </p>
            <Search setFilter={setFilter} />
            <div className="flex justify-center lg:flex-none  ">
              <Grid homes={homes} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
