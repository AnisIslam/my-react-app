import React, { useEffect } from "react";
import Cart from "../Cart/Cart";
import "./Home.css";
import { useState } from "react";
// import Swal from "sweetalert2/src/sweetalert2.js";

const Home = () => {
  const [allActors, setAllActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const budget = 20000;

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setAllActors(data));
  }, []);

//   console.log(allActors)

  const handleSelectActor = (actor) => {
    const isExist = selectedActors.find((item) => item.id == actor.id);

    let cost = actor.salary;

    if (isExist) {
      return alert("already booked");
    } else {
      selectedActors.forEach((item) => {
        cost = cost + item.salary;
      });
      const remaining = 20000 - cost;
      if (cost > 20000) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      } else {
        setRemaining(remaining);

        setTotalCost(cost);

        setSelectedActors([...selectedActors, actor]);
      }
    }
  };

  return (
    <div className="container">
      <div className="home-container">
        <div className="card-container">
          {allActors.map((actor) => (
            <div key={actor.id} className="card">
              <div className="card-img">
                <img className="photo" src={actor.image} alt="" />
              </div>
              <h2>{actor.name}</h2>
              <p>
                <small>
                {actor.twitter}
                </small>
              </p>
              <div className="info">
                <p>salary:{actor.salary} Taka</p>
                <p>{actor.role}</p>
              </div>
              <button
                onClick={() => handleSelectActor(actor)}
                className="card-btn"
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="cart">
          <Cart
            selectedActors={selectedActors}
            remaining={remaining}
            totalCost={totalCost}
          ></Cart>
        </div>
      </div>
    </div>
  );
};

export default Home;



// import React, { useEffect } from 'react';
// import './Home.css'
// const Home = () => {

//     useEffect(() => {
//         fetch("./data.json")
//           .then((res) => res.json())
//           .then((data) => console.log(data));
//       }, []);

//     return (
       
//         <div className="container">
//             <div className="card-container">
//                 <div className="card">
//                     <div className="card-img">
//                         <img className="photo" 
//                         src="https://i.ibb.co/86ys0m1/download.jpg" 
//                         alt="" />
//                     </div>
//                     <h2>Nagad</h2>
//                     <p><small>Ki obosta kemon choltese</small></p>
//                     <div className="info">
//                         <p>Salary: 30000</p>
//                     </div>
//                     <button className='card-btn'>Hire Me</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;