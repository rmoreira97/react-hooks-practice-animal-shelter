import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetchPets();  // Fetch all pets by default when component mounts
  }, []);  // Empty dependency array to ensure it runs only once after mount

  const fetchPets = () => {
    let endpoint = 'http://localhost:3001/pets';
    if (filters.type !== 'all') {
      endpoint += `?type=${filters.type}`;
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(data => setPets(data));
  }

  const handleAdoptPet = (id) => {
    const updatedPets = pets.map(pet => 
      pet.id === id ? {...pet, isAdopted: true} : pet
    );
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={setFilters} onFindPetsClick={fetchPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;