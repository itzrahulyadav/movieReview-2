import './App.css';
import React,{useEffect, useState} from 'react';
import Axios from 'axios';

function App() {
  const  [movieName,setMovieName] = useState('');
  const [movieReview,setMovieReview] = useState('');
  const [movieList,setMovieList] = useState([]);
  const [newReview,setReview] = useState('');


  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then(response =>{
      setMovieList(response.data);
    })
  },[])

  const submitReview = () => {
       Axios.post('http://localhost:3001/api/insert',{
        movieName:movieName,
        movieReview:movieReview
      })
  }
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }
  const updateReview = (movie) => {
    Axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview
    });
  }
  

  return (
    <div className="App">
     <h1>Movie Reviewer</h1>
     <div className = "form">
       <label>Movie name :</label>
     <input type = "text" name = "movieName" onChange = {(e)=>{
        setMovieName(e.target.value)
     }}/>
        <label>Review</label>
     <input type = "text" name = "review" onChange = {(e)=>{
        setMovieReview(e.target.value)
     }}/>
     <button onClick={submitReview}>Submit</button>
     
     {movieList.map((val) => {
        return <div className = "card">
          <h1>{val.movieName}</h1>
          <p>{val.movieReview}</p>

          <button onClick = {()=>{
             deleteReview(val.movieName)
          }}>
            Delete
          </button>
          <input type = "text" 
            id = "updateInput"
            onChange = {(e)=>{
              setReview(e.target.value)
            }}
          />
          <button onClick = {()=>{updateReview(val.movieName)}}>update</button>
        </div>

     })}
     </div>
    </div>
  );
}

export default App;
