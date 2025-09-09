import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import toast from "react-hot-toast";

import Card from "./Card";
import axios from "axios";

// import required modules

export default function CardSwiper() {
  const [homes, setHomes] = useState([]);
  // console.log(homes);
  useEffect(() => {
    axios.get(`/api/get-homes`).then(res => {
      setHomes(res.data);
    });
  }, []);
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
  return (
    <>
      <Swiper
        freeMode={true}
        navigation={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[FreeMode, Pagination, Navigation, A11y]}
        className="mySwiper"
        // responsive breakpoints
        breakpoints={{
          // break points for mobile devices
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: {
              enabled: false,
            },
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            navigation: {
              enabled: true,
            },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
            navigation: {
              enabled: true,
            },
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
            navigation: {
              enabled: true,
            }
           
          },
        }}
      >
        <>
          {homes.map(home => (
            <SwiperSlide key={homes.id} className="pr-5 ">
              <div>
                <Card key={home.id} {...home}
                 onClickFavorite={toggleFavorite}
                 favorite={!!favorites.find(favoriteId => favoriteId === home.id)}
               
                 />
              </div>{" "}
            </SwiperSlide>
          ))}
        </>
      </Swiper>
    </>
  );
}
