//Modal for the first body Carousel when images are clicked(after the banner carousel)

import React from 'react';
import './ModalBody1.css';

const ModalBody1 = (props) => {
  const { showModal, closeModal, image, selectedIndex, howotherscarousel } = props;
  const items = howotherscarousel[selectedIndex]?.Items || [];
  const userName = howotherscarousel[selectedIndex]?.text || [];
  return (
    showModal && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="imageDiv">
            <img className="background-image" src={image} alt="Background Image" />
            <img className="image" src={image} alt="Full Image" />
          </div>
          
          <div className="text-container">
              <h2 id="inThisLookHeading">In This Look</h2>
              <h4 className= "howOthersUserName">{userName}</h4>
            <ul>
                {items.map((item, index) => (
                  <div className="oneItemContainer" key={index}>
                    <h4 className="howOthersName">{item.name}</h4>
                    <h4 className="howOthersType">{item.type}</h4>
                      < img src={item.image} alt={item.name} />
                  </div>
                ))}
              </ul>
          </div>
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ModalBody1;