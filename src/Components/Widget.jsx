import React from 'react'
import { useState } from 'react'
import '../assets/Widget.css'
import { ImDroplet } from "react-icons/im";
import { TbWind } from "react-icons/tb";

const Widget = () => {

    const [data, setData] = useState([]);
    const [location, setLocation] = useState('');
    const url = `http://api.weatherapi.com/v1/current.json?key=cc1a1910cba24beabd8214258232905&q=${location}&aqi=no`;
    const [isFetch, setIsFetch] = useState(false);

    const getData = async () => {

        const response = await fetch(url).then(res => res.json());
        setData(response);
        setIsFetch(true);
    }

    const reload = () => {
        console.log(data);
    }

    return (
        <div className="widget">
            <div className="search">
                <input type="text" name="city" id="" placeholder='Ville :' onChange={e => setLocation(e.target.value)} />
                <input type="submit" value="Chercher" onClick={getData} />
            </div>
            {isFetch && data ? (<>
                <div className="weather" style={{
                    backgroundImage: `url(${data.current.is_day=== 1 ? 'img/day.jpg' : 'img/night.jpg'})`,
                    backgroundPosition: "center",
                backgroundSize: "cover",
                }}>
                    <div className="location">
                        <h1>{data.location.name}</h1>
                        <h5>{data.location.region} , {data.location.country}</h5>
                    </div>
                    <div className="content">
                        <img src={data.current.condition.icon} alt="" />
                        <h2>{data.current.condition.text}, {data.current.temp_c} °C</h2>
                        <div className="stats">
                            <h4><ImDroplet className='blue' /> {data.current.humidity} % <TbWind className='blue' /> {data.current.wind_kph} KM/H</h4>
                            <h4></h4>
                        </div>
                    </div>
                </div>

            </>) : console.log('null')}
        </div>
    )
}

export default Widget