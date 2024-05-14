
function MyNutrionsComponent ({ nutrients, calories }) {
    const nutrientsArray = Object.entries(nutrients);
  
    return (
      <div>
        <ul className="container list">
          {nutrientsArray.map(([key, value], index) => (
            <li key={index}>
              <img src={require("./icons8-checkmark-yes-32.png")} alt="icon" className="icon" />
              <span className="spa">{value.label}</span>: <span className="spa1">{value.quantity.toFixed(4)} {value.unit}</span>  
              </li>
          ))}
        </ul>
        <div className="container ">
        <h2 >TOTAL:{calories.toFixed()} calories</h2>
         </div>   
      </div>
    );
  }  
  export default MyNutrionsComponent;
  