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
import { getList, getListByName } from "./store/reducer";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const [currentList, setCurrentList] = useState({});

  const listInnerRef = useRef();

  const { list = {}, currentPage = 0 } = useSelector(
    (state) => state.moviesReducer
  );

  useEffect(() => {
    dispatch(getList(currentPage + 1));
  }, []);

  useEffect(() => {
    if (isSearch) {
      setCurrentList({ ...list });
    } else {
      if (list["content-items"]) {
        const newContent = list["content-items"].content;
        const currentContent = currentList["content-items"]
          ? currentList["content-items"].content
          : [];
        setCurrentList({
          ...newContent,
          ["content-items"]: { content: [...newContent, ...currentContent] },
        });
      }
    }
  }, [list]);

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
    if (listInnerRef.current && !isSearch) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight)
        dispatch(getList(currentPage + 1));
    }
  };

  const [isSearch, toggleSearch] = useState(false);
  const [searchName, setSearchName] = useState("");

  const timer = useRef(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (searchName) {
      timer.current = setTimeout(() => {
        getListByNameDispatch();
      }, 500);
    }
  }, [searchName]);

  const getListByNameDispatch = () => dispatch(getListByName(searchName));

  return (
    <div className="app" onScroll={onScroll} ref={listInnerRef}>
      <div className="header">
        <div className="bar">
          <div>
            <div
              className="icon"
              onClick={() => {
                if (isSearch) {
                  toggleSearch(false);
                  setSearchName("");
                  setCurrentList({});
                  dispatch(getList(1));
                }
              }}
            >
              <img src={back} />
            </div>
            {(!isSearch && <div>{list?.title}</div>) || (
              <div className="input-box">
                <input
                  autoFocus
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="icon" onClick={() => toggleSearch(!isSearch)}>
            {!isSearch && <img src={search} />}
          </div>
        </div>
      </div>
      <div className="second-layout">
        <div className="main">
          {currentList["content-items"]?.content?.map((movie, index) => (
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
        {isSearch && !currentList && (
          <div className="no-result">{"No result found"}</div>
        )}
      </div>
    </div>
  );
};

export default App;
