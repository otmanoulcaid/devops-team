import Tabe from "./Tabe";
const Button= (_props: any)=>{
  const handleClick=()=>{
    _props.onClick();
  }
    return (
      <button className="button" onClick={handleClick}>Continue</button>
    );
}
export default Button;