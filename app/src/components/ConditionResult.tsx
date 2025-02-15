import React, { useState } from "react";
import Loader from "./Loader";
type Props = {
  condition:string;
  description:string;
  loading:boolean;
};
function ConditionResult(_prop: Props) {
  const [hidden,setHidden] = useState<boolean>(false)
  const hide =()=>{
    setHidden(!hidden);
  }
  return (
    <div className="conditionContianer">
      {_prop.loading && <Loader />} {/* Conditionally render the Loader */}
      {_prop.description && _prop.condition && !_prop.loading && (
        <>
          <h3
            style={{
              fontFamily: "Sans-serif",
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            Conditions that match your symptoms
          </h3>
          <div className="listOfConditions">
            <div
              className="condition"
              onClick={() => {
                hide();
              }}
              style={{ cursor: "pointer" }}
            >
              {_prop.condition}
            </div>
          </div>
        </>
      )}{" "}
      {hidden && (
        <div className="description">
          <h4>Description of {_prop.condition}</h4>
          <br />
          <hr />
          {_prop.description}
        </div>
      )}
    </div>
  );
}

export default ConditionResult;
