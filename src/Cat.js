import React, { useState } from 'react';
import './Cat.scss';

function Cat() {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "https://api.thecatapi.com/v1/images/search";

  const getRandomCats = async () => {
    setLoading(true);
    setError(null);
    setCatImage(null);

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("JSON:", json);
      
      if (json && json.length > 0) {
        setCatImage(json[0].url);
      }
    } catch (e) {
      console.log("This is an error");
      console.log(e);
      setError("Failed to fetch cat image. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cat-generator">
      <section className="header-content">
        <button className="btn" onClick={getRandomCats} disabled={loading}>
          {loading ? 'Loading...' : 'Get Random Cat'}
        </button>
      </section>

      <div className="container">
        {loading && <div className="loading">Fetching your random cat...</div>}
        {error && <div className="error">{error}</div>}
        {catImage && !loading && (
          <div className="cats">
            <img 
              src={catImage} 
              alt="Random cat" 
              className="random_cats"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cat;
