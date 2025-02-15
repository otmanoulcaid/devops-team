import AddButton from "./AddButton";
type AddButtonProps = {
  onClick: () => void;
};

function SymptomsScroller({ _prop }: any,{functionClick}: any) {
  const handleClick=()=>{
    functionClick.onClick();
  }
  return (
    <>
      {_prop && (
        <div className="SymptomList">
          <div className="SymptomItem">
            <li>
              <a className="dropdown-item">Action</a>
            </li>
            <AddButton onClick={handleClick} />
          </div>
        </div>
      )}
    </>
  );
}

export default SymptomsScroller;
