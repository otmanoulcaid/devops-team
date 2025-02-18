import { useState,useEffect} from "react";
import "../components/sideBar.css";
import { FaBars,FaTimes } from "react-icons/fa";
import { sendData } from "./myFunctions";
import diseaseDesign from "../assets/diseaseDesign.png";
import Loader from "./Loader";

const ToggleSidebarButton: React.FC<{ onClick: () => void }>=({
  onClick
}) => {
  return (
    <button className=" btn-primary" style={{cursor:"pointer"}} onClick={onClick}>
      <FaBars></FaBars>
    </button>
  );
};
 export interface YourDictionary {
  [key: string]: string[]; // Define the type for your dictionary
}
type prop = {
  symptoms: string[];
  symptomsFilterd:YourDictionary;
};
const SymptomSideBar : React.FC<prop> = ({ symptoms,symptomsFilterd }:prop) => {
  const [keys,setkeys] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hiddenDescription, setHiddenDescription] = useState(false);
  const [showCondition, setShowCondition] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [answer, setAnswer] = useState(Object);
  useEffect(() => {
    setkeys(Object.keys(symptomsFilterd));
    setList([...symptoms]);
  }, [symptoms]);

  const toggleList = () => {
    setHidden(!hidden);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleConditionBar = () => {
    setShowCondition(!showCondition);
  };
  const toggleDescription = () => {
    setHiddenDescription(!hiddenDescription);
  };
  const handleCheckboxChange = (itemName: string) => {
    const isChecked = checkedItems.includes(itemName);
    if (isChecked) {
      // If item is already checked, remove it from the checked items
      setCheckedItems(checkedItems.filter((item) => item !== itemName));
    } else {
      // If item is not checked, add it to the checked items
      setCheckedItems([...checkedItems, itemName]);
    }
  };

  //handle loader animation
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    setIsLoading(true);

    // Simulate a delay to mimic fetching data
    setTimeout(() => {
      // Once data is fetched, set isLoading to false and display the result
      setIsLoading(false);
    }, 2000); // Adjust the time as per your requirement

  };
  return (
    <>
      <div style={{ position: "absolute", top: "0%", display: "flex" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-md">
          <div className=" navContianer">
            <img
              src={diseaseDesign}
              alt=""
              style={{ width: "250px", height: "60px" }}
            />
            <div className="navButton">
              <ToggleSidebarButton onClick={toggleSidebar} />
            </div>
          </div>
        </nav>
        <div
          className={`sidebar ${isOpen ? "active" : ""}`}
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: "2",
          }}
        >
          <div className="sd-header">
            <h4 className="mb-0">Symptoms by Body parts</h4>
            <div className="btn btn-primary" onClick={toggleSidebar}>
              <FaTimes className="faTimes" />
            </div>
          </div>
          <div className="sd-body">
            <ul>
            {keys.map((itam,index)=>(
              <li>
                <a className="sd-link" onClick={()=>{
                  setHidden(true);
                  setFilterName(itam);
                  setShowCondition(false);
                }}>
                  {itam}
                </a>
              </li>
            ))

            }
            </ul>
          <div className="btnCoondition">
            <button
              className="btnx conditionC"
              onClick={() => {
                toggleConditionBar();
                handleClick();
                setHidden(false);
                setHiddenDescription(false);
                sendData(checkedItems).then((result) => {
                  setAnswer(result);
                });
              }}
            >
              Condition
            </button>
          </div>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen ? "active" : ""}`}
          style={{ position: "fixed", zIndex: "1" }}
          onClick={() => {
            toggleSidebar();
            setShowCondition(false);
            setHidden(false);
            setHiddenDescription(false);
          }}
        ></div>
        <>
          {hidden && (
            <>
              {(
                <div className="listOfSymptoms">
                  <h3>List Of {filterName} Symptoms</h3>
                  <div className="symptoms">
                    {Object.keys(symptomsFilterd)
                      .filter((bodyPart) =>
                        bodyPart.toLowerCase().includes(filterName.toLowerCase())
                      )
                      .map((bodyPart, index) => (
                        <>
                          {symptomsFilterd[bodyPart].map((symptom, idx) => (
                            <li key={idx} className="listFilteredItems">
                              <input
                                type="checkbox"
                                id={symptom}
                                name={symptom}
                                className="checkBox"
                                checked={checkedItems.includes(symptom)}
                                onChange={() => handleCheckboxChange(symptom)}
                              />
                              <label htmlFor={symptom} className="label">
                                {symptom}
                              </label>
                            </li>
                          ))}
                        </>
                      ))}
                  </div>
                  <div className="btnContianer">
                    <button className="btnx Done" onClick={toggleList}>
                      Done
                    </button>
                    <button className="btnx skip" onClick={toggleList}>
                      skip
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
        <>
          {showCondition && (
            <>
              <div className="conditionContant">
                <h4 style={{ position: "absolute", top: "10%" }}>
                  Conditions that match your symptoms
                </h4>
                {isLoading && <Loader />}{" "}
                {/* Conditionally render the Loader */}
                {answer.condition && !isLoading && (
                  <>
                    <b
                      onClick={toggleDescription}
                      style={{ cursor: "pointer" }}
                      className="answer"
                    >
                      {answer.condition}
                    </b>
                  </>
                )}{" "}
                {hiddenDescription && (
                  <>
                    <div className="descriptionSideBar">
                      <h4>Description of {answer.condition}</h4>
                      <hr style={{ color: "black", width: "100%" }} />
                      {answer.description}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default SymptomSideBar;
