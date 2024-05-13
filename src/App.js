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
    // const timer = setTimeout(() => setStateLoader(false),3000 );
    //   return() => clearTimeout(timer) 
    async function fetchNutritionInfo() {
      const url = 'https://api.edamam.com/api/nutrition-details';
      const appId = '53324613';
      const appKey = 'ee9066be70a6be976c5430efb9442c2f';
     
      //   const requestBody = {
      // // //   // title: "lemon",
      //     ingr: ["1 carrot", "3 cabbage"]
      //   };

      const requestBody = {
      //    // title: "lemon",
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
        // console.error('Error fetching nutrition data:', error);
         alertUse()
      } finally {
        setStateLoader(false); // Скрываем Loader после завершения загрузки (в том числе и после ошибки)
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
    setStateLoader(true); // Показываем Loader перед началом загрузки
    setTimeout(() => setStateLoader(false), 25000); // Скрываем Loader после 3 секунд загрузки
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
          {/* <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon" /> */}
        </button>
      </div>

      {stateLoader && <LoaderPage />} {/* Показываем Loader при stateLoader === true */}

      {myRecipes.map((recipe, index) => (
        <MyNutrionsComponent key={index} nutrients={recipe.totalNutrients} calories={recipe.calories}  />
      ))}
    
    </div>
  );
}

export default App;
