import './App.css';
import React, { useEffect, useState } from 'react';
import MyNutrionsComponent from './MyNutrionsComponent';
import Swal from 'sweetalert2';
import LoaderPage from './Loader/LoaderPage';
import video from './Vegetables.mp4'

function App() {
  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const[wordSubmitted, setWordSubmitted ]= useState("1 lemon");
  const [stateLoader, setStateLoader] = useState(true);

  useEffect(() => {
    
    async function fetchNutritionInfo() {
      const url = 'https://api.edamam.com/api/nutrition-details';
      const appId = '53324613';
      const appKey = 'ee9066be70a6be976c5430efb9442c2f';
     
      
      const requestBody = {
        ingr: wordSubmitted.split(", ")
      };
      
      try {
          const response = await fetch(`${url}?app_id=${appId}&app_key=${appKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch nutrition data');
        }

        const data = await response.json();
        setMyRecipes([data]);
        console.log(data);
      } catch (error) {
        alertUse()
      } finally {
        setStateLoader(false); 
      }
    }
    startLoad(); 
    fetchNutritionInfo();
  }, [wordSubmitted]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
    console.log(e.target.value);
    };

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
      };
  const alertUse = () => {
    Swal.fire({
      title: "The request was entered incorrectly",
      text: "Example input: 2 lemon, 3 carrot, ..",
      icon: "question"
    });
  }
  
  const startLoad = () => {
    setStateLoader(true); 
    setTimeout(() => setStateLoader(false), 25000); 
  };
  return (
    
       <div className='app'>
 <div className="container">
    <video autoPlay muted loop>
     <source src={video} type="video/mp4" />
  </video>
   
        <h1>Nutrition Analysis</h1>
      </div>

      <div className='container'>
        <form onSubmit={finalSearch}>
          <input placeholder='search' onChange={myRecipeSearch} className='search' value={mySearch} />
        </form>
      </div>

      <div className='container'>
        <button onClick={finalSearch}>
        <img src={require("./search.png")} alt="icon" className="icon" />     
              </button>
      </div>
      <div className='container'>
       <h2 className='ingrad'>{wordSubmitted}</h2>          
      </div>     

      {stateLoader && <LoaderPage />} 

      {myRecipes.map((recipe, index) => (
        <MyNutrionsComponent key={index} nutrients={recipe.totalNutrients} calories={recipe.calories}  />
      ))}
    
    </div>
  );
}

export default App;
