import { React, useState, useEffect } from "react";
import "./App.css";

const App = () => {
    const [locations, setLocations] = useState(null);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if (searchString && searchString.length >= 2) {
            async function fetchData() {
                await fetch(`/locations?q=${searchString}`)
                    .then((res) => res.json())
                    .then((data) => setLocations(data));
            }

            fetchData();
        }
        else {
          setLocations(null);
        }
    }, [searchString]);

    return (
        <div className="App">
            <div id="searchBox">
              <span>Search: </span>
                <input
                    type="text"
                    autoFocus
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            <div id="results">
                {locations &&
                    locations.map((location, index) => <div key={index}>{location}</div>)}
            </div>
        </div>
    );
};

export default App;
