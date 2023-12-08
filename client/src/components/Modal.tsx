import React, { useContext, useState } from "react";
import Styles from "../styles/modal.module.css";
import ClickAwayListener from 'react-click-away-listener';
import { MyContext } from "../context/Mycontext";
import { FileUploader } from "react-drag-drop-files";
export default function Modal() {
    const {setIsModalOpen}=useContext(MyContext)
    const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.files)
    }
    const fileTypes = ["JPG", "PNG", "GIF"];
  return (
            <div className={Styles.overlay}>
                <i className={`fa-solid fa-x ${Styles.closeBtn}`}></i>
             <ClickAwayListener onClickAway={()=>setIsModalOpen(false)}>
             <div className={Styles.modal}>
             <FileUploader handleChange={handleFile} name="file" types={fileTypes} />
                    <p className={Styles.title}>
                        Create new post
                    </p>
                    <div className={Styles.createPost}>
                    <div className={Styles.icons}>
                    <i className={`fa-regular fa-image ${Styles.icon1}`}></i>
                    <i className={`fa-regular fa-square-caret-right fa-thin ${Styles.icon2}`}></i>
                    </div>
                    <p>Drag photos and videos here</p>
                    <div className={Styles.inputContainer}>
                        <label htmlFor="file">Select from computer</label>
                        <input type="file" name="file" id="file" onChange={handleFile}/>
                    </div>
                    </div>
                </div>
             </ClickAwayListener>
            </div>
  );
}
