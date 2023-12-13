import React, { useContext, useRef } from 'react'
import Styles from "../styles/components/discardModal.module.css"
import ClickAwayListener from 'react-click-away-listener'
import { MyContext } from '../context/Mycontext'
export default function DiscardModal() {
    const { setIsDiscardModalOpen ,setImages,setPostSteps }=useContext(MyContext)
    const discardModalRef=useRef<HTMLDivElement | null>(null)
    const discardPost=()=>{
        setImages([])
        setIsDiscardModalOpen(false)
        setPostSteps(0)
    }
  return (
    <div className={Styles.overlay} ref={discardModalRef}>
      <ClickAwayListener onClickAway={()=>setIsDiscardModalOpen(false)}>
      <div className={Styles.modal}>
            <div className={Styles.warning}>
                <h3>Discard post?</h3>
                <p>If you leave, your edits won't be saved.</p>
            </div>
            <button className={Styles.discardBtn} type='button' onClick={discardPost}>Discard</button>
            <button className={Styles.cancleBtn} type='button' onClick={()=>{
                setIsDiscardModalOpen(false)
            }}>Cancle</button>
        </div>
      </ClickAwayListener>
    </div>
  )
}   
