import Layout from "../components/Layout";
import axios from "axios";
import ListingForm from "../components/ListingForm";
const Create = () => {
  const addHome = data => axios.post("/api/homes", data);

  return (
    <Layout>
      <div className="bg-gray-100 p-5">
        <div className="mx-auto max-w-screen-sm py-2 ">
          <h1 className="text-xl font-medium text-gray-800">List your home</h1>
          <p className="text-gray-500">
            Fill out the form below to list a new home.
          </p>
          <div className="mt-8 rounded-md bg-white p-7 shadow-md">
            <ListingForm
              buttonText="Add home"
              redirectPath="/"
              onSubmit={addHome}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
