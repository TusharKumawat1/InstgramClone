import React, { useEffect, useState } from "react";
import Styles from "../styles/hero.module.css";
import { asset8, asset2, asset3, asset4, asset5 } from "../assets/index";
export default function Hero() {
  //geating random path
  const list = [asset2, asset3, asset4, asset5];
  const [newPath, setNewPath] = useState(list[0]);
  function changePath(list: any): any {
    return list[
      list.indexOf(newPath) === 3 ? 0 : list.indexOf(newPath) + 1
    ];
  }

  //Debouncing....
  useEffect(() => {
    const myInterval = setInterval(() => {
      setNewPath(changePath(list));
    }, 4999);
    return () => {
      clearInterval(myInterval);
    };
  }, [newPath]);
  return (
    <div className={Styles.heroImageContainer}>
      <img src={asset8} alt="phone" className={Styles.coverImage} />
      <div className={Styles.randomImageContainer}>
        <img
          src={newPath}
          alt="phone"
          className={`${Styles.randomImages}`}
        />
      </div>
    </div>
  );
}
