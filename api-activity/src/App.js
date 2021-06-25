import { useEffect, useRef, useState } from "react";
import "./App.css";
import _ from "lodash";

import CharacterCard from "./components/CharacterCard";
import FilmCard from "./components/FilmCard";
import FigureCard from "./components/FigureCard";
import InfoBox from "./components/InfoBox";

import starshipImage from "./assets/starship.png";
import vehicleImage from "./assets/snowspeeder.png";
import SpecieImage from "./assets/species.png";
import homeWorldImage from './assets/homeworld.png'
import axios from "axios";

const App = (props) => {
  const isMountedRef = useRef(true);
  const baseUrl = "https://swapi.dev/api/";

  const [selectCharacter, setSelectedCharacter] = useState({});
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [homeworld,setHomeworld]=useState([])

  useEffect(() => {
    getAllCharacter();
    getCharacter();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getAllCharacter = () => {
    axios
      .get(baseUrl + "people")
      .then((res) => {
        // console.log(res)
        setCharacters(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCharacter = (character) => {
    if (character) {
      getCharacterByUrl(character.url);
      getCharacterFilmByUrl(character.films);
      getCharacterSpeiceByUrl(character.species)
      getCharacterStarshipsByUrl(character.starships)
      getCharacterVehiclesByUrl(character.vehicles)
      getHomeworldByUrl(character.homeworld)
    }

    console.log(character);
    // axios
    // .get(props.getCharacter)
    // .then((res)=>{
    //   console.log(res)
    //   setSelectedCharacter({"ss":"sa"})
    //   setFilms(res.films)
    //   setSpecies(res.species)
    //   setVehicles(res.vehicles)
    //   setStarships(res.starships)

    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  };

  const getCharacterByUrl = (url) => {
    axios
      .get(url)
      .then((res) => {
        setSelectedCharacter(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCharacterFilmByUrl = (url) => {
    setFilms([]);

    url.map((url) => {
      console.log(url);
      axios
        .get(url)
        .then((res) => {
          setFilms((films) => [...films, res.data]);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const getCharacterSpeiceByUrl = (url) => {
    setSpecies([])
    url.map((url)=>{
      axios.get(url)
      .then((res)=>{

        setSpecies(species=>[...species,res.data])
      }
      )
      .catch((err)=>{console.log(err)})

    })
  };


  const getCharacterStarshipsByUrl =(url)=>{
    setStarships([])

    url.map((url)=>{
      axios.get(url)
      .then((res)=>{

        setStarships(starships=>[...starships,res.data])
      }
      )
      .catch((err)=>{console.log(err)})

    })  }

    
  const getCharacterVehiclesByUrl =(url)=>{
    setVehicles([])

    url.map((url)=>{
      axios.get(url)
      .then((res)=>{

        setVehicles(vehicles=>[...vehicles,res.data])
      }
      )
      .catch((err)=>{console.log(err)})

    })  }

    const getHomeworldByUrl =(url)=>{
      setHomeworld([])
  
 
        axios.get(url)
        .then((res)=>{
  
          setHomeworld(res.data)
        }
        )
        .catch((err)=>{console.log(err)})
  
    }

    
  return (
    <div className="App">
      <div className="container">
        <div id="stars"></div>
        <div className="characters-box">
          {!_.isEmpty(characters) &&
            characters.map((character) => (
              <CharacterCard
                character={character}
                getCharacter={() => getCharacter(character)}
              />
            ))}
          {_.isEmpty(characters) && <div> No Characters to show </div>}
        </div>

        <div className="detail-box">
          <div className="detail-content">
            <div>
              {!_.isEmpty(selectCharacter) && (
                <>
                  <InfoBox title="Name" characterInfo={selectCharacter.name} />
                  <InfoBox
                    title="Birth Year"
                    characterInfo={selectCharacter.birth_year}
                  />
                  <InfoBox
                    title="Eye Color"
                    characterInfo={selectCharacter.eye_color}
                  />
                  <InfoBox
                    title="Hair Color"
                    characterInfo={selectCharacter.hair_color}
                  />

                  <InfoBox
                    title="Skin Color"
                    characterInfo={selectCharacter.skin_color}
                  />
                  <InfoBox
                    title="Gender"
                    characterInfo={selectCharacter.gender}
                  />
                  <InfoBox
                    title="Height"
                    characterInfo={selectCharacter.height}
                  />
                  <InfoBox title="Mass" characterInfo={selectCharacter.mass} />
                </>
              )}

              {_.isEmpty(selectCharacter) && (
                <>
                  <div> No Character to show </div>
                </>
              )}
            </div>

            {!_.isEmpty(films) && (
              <>
                <InfoBox title="Films" characterInfo={""} />
                <div className="list">
                  {films.map((film) => (
                    <FilmCard film={film} />
                  ))}
                </div>
              </>
            )}

            {!_.isEmpty(species) && (
              <>
                <InfoBox title="Species" characterInfo={""} />
                <div className="list">
                  {species.map((specie) => (
                    <FigureCard figure={specie} figureImage={SpecieImage} />
                  ))}
                </div>
              </>
            )}

            {!_.isEmpty(starships) && (
              <>
                <InfoBox title="Starships" characterInfo={""} />
                <div className="list">
                  {starships.map((starship) => (
                    <FigureCard figure={starship} figureImage={starshipImage} />
                  ))}
                </div>
              </>
            )}

            {!_.isEmpty(vehicles) && (
              <>
                <InfoBox title="Vehicles" characterInfo={""} />
                <div className="list">
                  {vehicles.map((vehicle) => (
                    <FigureCard figure={vehicle} figureImage={vehicleImage} />
                  ))}
                </div>
              </>
            )}

            {!_.isEmpty(homeworld) && (
              <>
                <InfoBox title="Home World" characterInfo={""} />
                <div className="list">
                  
                    <FigureCard figure={homeworld} figureImage={homeWorldImage} />
                
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
