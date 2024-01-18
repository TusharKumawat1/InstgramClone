import React, { useContext, useState } from "react";
import Styles from "../../styles/components/searchbox.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/Mycontext";
type resultType = {
  pfp: string;
  _id: string;
  userId: userId;
};
type userId = {
  username: string;
  fullname: string;
};
export default function SearchBox() {
  const [loading, setloading] = useState(true);
  const [searchResult, setSearchResult] = useState<resultType[]>();
  const [query, setQuery] = useState("");
  const { authenticUser, showSearchBox, setshowSearchBox } =
    useContext(MyContext);
  const token = localStorage.getItem("token")!;
  const SearchUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setloading(true);
    setQuery(e.target.value);
    try {
      if (!e.target.value) {
        setSearchResult([]);
        setloading(false);
        return;
      }
      const encodedQuery = encodeURIComponent(e.target.value);
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_PORT}/users/searchUser?search=${encodedQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const parsedData = await res.json();
      console.log(parsedData);
      setSearchResult(parsedData.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setloading(false);
    }
  };
  const cancleSearch = () => {
    setQuery("");
    setSearchResult([]);
  };
  return (
    <div className={Styles.container}>
     
      <h2> <i
        className={`fa-solid fa-arrow-left ${Styles.backBtn}`}
        onClick={() => setshowSearchBox(false)}
      ></i> &nbsp; Search</h2>
      <div className={Styles.inputContainer}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={SearchUser}
        />
        <i className="fa-solid fa-circle-xmark" onClick={cancleSearch}></i>
      </div>
      <div className={Styles.recentSearch}>
        <h4>Recent</h4>
        {searchResult && searchResult?.length > 0 ? (
          <div className={Styles.searchResults}>
            {loading
              ? Array(15)
                  .fill(undefined)
                  .map((_, index: number) => {
                    return (
                      <div className={Styles.skeletons} key={index}>
                        <Skeleton circle={true} width={45} height={45} />
                        <div>
                          {" "}
                          <Skeleton width={200} height={15} />
                          <Skeleton width={100} height={15} />
                        </div>
                      </div>
                    );
                  })
              : searchResult?.map((result, index) => {
                  return (
                    <Link
                      to={`/search/${result._id}`}
                      className={Styles.users}
                      key={index}
                      onClick={() => setshowSearchBox(false)}
                    >
                      <img
                        src={result.pfp}
                        alt={result._id}
                        className={Styles.pfp}
                      />
                      <div>
                        {" "}
                        <h4 className={Styles.username}>
                          {result.userId.username}
                        </h4>
                        <p className={Styles.fullname}>
                          {result.userId.fullname}
                        </p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        ) : (
          <div className={Styles.searchResult}>
            <p>No recent searches.</p>
          </div>
        )}
      </div>
    </div>
  );
}
