type AddButtonProps = {
  onClick: () => void;
};
function AddButton({ onClick }: AddButtonProps) {
  return (
    <>
      <button className="AddButton" onClick={()=>{
        onClick();
      }}>
        <a>Add</a>
      </button>
    </>
  );
}

export default AddButton;
