// HiddenTextComponent.tsx

import React, { useState } from "react";

const HiddenTextComponent: React.FC = () => {
  // State to track whether the text is visible or hidden
  const [showText, setShowText] = useState(false);

  // Function to toggle the visibility of the text
  const toggleTextVisibility = () => {
    setShowText(!showText);
  };

  return (
    <div className="hidden-Content" style={{color:"rgb(153, 152, 152)"}}>
      <div>
      <label style={{fontSize:"samll"}}>This tool does not provide medical advice.</label>
      <h6
        onClick={toggleTextVisibility}
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
          display:"inline"
        }}
      >
        Click Here
      </h6>
      </div>
      <div className="hiddenText">
        {showText && (
          <h6>
            This tool is not intended to be a substitute for professional
            medical advice, diagnosis, or treatment. Always read the label
            before taking any over-the-counter (OTC) medications. Always seek
            the advice of your physician or other qualified health provider with
            any questions you may have regarding a medical condition. Never
            disregard professional medical advice or delay in seeking it because
            of something you have read on ourwebsite!
          </h6>
        )}
      </div>
    </div>
  );
};

export default HiddenTextComponent;
