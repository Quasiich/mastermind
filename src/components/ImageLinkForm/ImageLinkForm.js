import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
   return (
      <div>
         <p className="f3">
            {"This Mastermind will detect the faces in your pictures. Give it a try! (:s"}
         </p>
         <div className={'center'}>
            <div className={'form center pa3 br3 shadow-3'}>
               <input  className="f4 pa2 w-70 center" type="text"/>
               <button className='w-30 grow f4 link ph3 pv2 div white bg-light-purple'>Detect</button>
            </div>
         </div>
      </div>
   )
}

export default ImageLinkForm;