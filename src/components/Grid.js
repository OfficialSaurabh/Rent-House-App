import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import axios from "axios";
import toast from "react-hot-toast";
// import { ExclamationIcon } from '@heroicons/react/outline';

const Grid = ({ homes = [] }) => {
  const [favorites, setFavorites] = useState([]);
  const isEmpty = homes.length === 0;
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/user/favorites");
        setFavorites(data);
      } catch (e) {
        setFavorites([]);
      }
    })();
  }, []);

  const toggleFavorite = id => {
    try {
      toast.dismiss("updateFavorite");
      setFavorites(prev => {
        const isFavorite = prev.find(favoriteId => favoriteId === id);
        // Remove from favorite
        if (isFavorite) {
          axios.delete(`/api/homes/${id}/favorite`);
          return prev.filter(favoriteId => favoriteId !== id);
        }
        // Add to favorite
        else {
          axios.put(`/api/homes/${id}/favorite`);
          return [...prev, id];
        }
      });
    } catch (e) {
      toast.error("Unable to update favorite", { id: "updateFavorite" });
    }
  };

  return isEmpty ? (
    <p className="inline-flex max-w-max items-center space-x-1 rounded-md bg-amber-100 px-4 py-2 text-amber-700">
      {/* <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" /> */}
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <>
      <div className="grid gap-4 pt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        {homes.map(home => (
          <Card
            key={home.id}
            {...home}
            onClickFavorite={toggleFavorite}
            favorite={!!favorites.find(favoriteId => favoriteId === home.id)}
          />
        ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  homes: PropTypes.array,
};

export default Grid;
