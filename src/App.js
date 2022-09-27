import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import back from "./images/back.png";
import search from "./images/search.png";
import poster1 from "./images/poster1.jpg";
import poster2 from "./images/poster2.jpg";
import poster3 from "./images/poster3.jpg";
import poster4 from "./images/poster4.jpg";
import poster5 from "./images/poster5.jpg";
import poster6 from "./images/poster6.jpg";
import poster7 from "./images/poster7.jpg";
import poster8 from "./images/poster8.jpg";
import poster9 from "./images/poster9.jpg";
import missingPoster from "./images/placeholder_for_missing_posters.png";
import { getList, resetLoading } from "./store/reducer";
import Loader from "./components/Loader/loader";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [isShow, toggleShow] = useState(false);

  const listInnerRef = useRef();

  const {
    list = {},
    currentPage = 0,
    isListLoaded,
  } = useSelector((state) => state.moviesReducer);

  useEffect(() => {
    if (currentPage === 0) {
      dispatch(resetLoading());
      setTimeout(() => {
        dispatch(getList(1));
      }, 500);
    }
  }, []);

  const imageMap = {
    "poster1.jpg": poster1,
    "poster2.jpg": poster2,
    "poster3.jpg": poster3,
    "poster4.jpg": poster4,
    "poster5.jpg": poster5,
    "poster6.jpg": poster6,
    "poster7.jpg": poster7,
    "poster8.jpg": poster8,
    "poster9.jpg": poster9,
    "posterthatismissing.jpg": missingPoster,
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && isListLoaded === "none") {
        toggleShow(false);
        dispatch(resetLoading("loading"));
        setTimeout(() => {
          dispatch(getList(currentPage + 1));
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (isListLoaded === "loaded") {
      toggleShow(true);
      dispatch(resetLoading("none"));
    }
  }, [isListLoaded]);

  return (
    <div className="app" onScroll={onScroll} ref={listInnerRef}>
      <div className="header">
        <div className="bar">
          <div>
            <div className="icon">
              <img src={back} />
            </div>
            <div>{list?.title}</div>
          </div>
          <div className="icon">
            <img src={search} />
          </div>
        </div>
      </div>
      <div className="second-layout">
        {(isShow && (
          <div className="main">
            {list["content-items"]?.content?.map((movie, index) => (
              <div key={index} className="poster">
                <img
                  src={
                    (imageMap[movie["poster-image"]] &&
                      imageMap[movie["poster-image"]]) ||
                    imageMap[movie["poster-image"]]
                  }
                />
                <div>{movie?.name}</div>
              </div>
            ))}
          </div>
        )) || <Loader />}
      </div>
    </div>
  );
};

export default App;
