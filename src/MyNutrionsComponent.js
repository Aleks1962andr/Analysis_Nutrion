// function MyNutrionsComponent ({ nutrients}) {
//     // const nutrientsArray = Object.values(nutrients);
//     return (
// <div>

// <ul className="container list " >
//  {nutrients.map((ingredient, index) => (
//    <li key={index}><img src=" https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-check-multimedia-kiranshastry-gradient-kiranshastry.png " alt="icon" className="icon"/>{ingredient}</li>
//                 ))} 
// {/* <p>{nutrientsArray.label}: {nutrientsArray.quantity} {nutrientsArray.unit}</p>
// <p>{nutrients.calories}</p>  */}
//             </ul>
// {/* 
// <div className="container "> 
// <h2 >{calories.toFixed()} calories</h2>
// </div>  */}

// </div>
//     )
// }
// export default MyNutrionsComponent;

function MyNutrionsComponent ({ nutrients, calories }) {
    const nutrientsArray = Object.entries(nutrients);
  
    return (
      <div>
        <ul className="container list">
          {nutrientsArray.map(([key, value], index) => (
            <li key={index}>
              <img src={require("./icons8-checkmark-yes-32.png")} alt="icon" className="icon" />
              <span className="spa">{value.label}</span>: <span className="spa1">{value.quantity.toFixed(4)} {value.unit}</span>  
              {/* <span className="spa1">{key}</span>: <span className="spa">{value.label}</span>: {value.quantity.toFixed(4)} {value.unit} */}
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
  