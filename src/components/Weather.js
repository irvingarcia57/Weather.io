import React from 'react';
import './Styles.scss';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: undefined,
            longitude: undefined,
            city: undefined,
            temp: undefined,
            error: undefined,
            isLoaded: false,
            date: undefined,
            month: undefined,
            year: undefined,
            data: [],
            data2: [],
            data3: []
        }

    }
    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);

        });
    }
    getWeather = async (latitude, longitude) => {
        const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?units=I&lang=en&lon=${longitude}&lat=${latitude}`;
        const url2 = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lang=en&lat=${latitude}&lon=${longitude}`;
        const url3 = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?units=I&lang=en&lat=${latitude}&lon=${longitude}`;
        const api_call = await fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": "b20caa8884msha5f07d84af7a506p1a1accjsn689aca296a00"
            }
        });
        const api_call2 = await fetch(url2, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": "b20caa8884msha5f07d84af7a506p1a1accjsn689aca296a00"
            }
        });
        const api_call3 = await fetch(url3, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                "x-rapidapi-key": "b20caa8884msha5f07d84af7a506p1a1accjsn689aca296a00"
            }
        });
        const { data } = await api_call.json();
        const data2 = await api_call2.json();
        const data3 = await api_call3.json();

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();

        console.log(data);
        console.log(data2);
        console.log(data3);

        this.setState({
            latitude: latitude,
            longitude: longitude,
            city: data[0].city_name,
            temp: data[0].temp,
            date: date,
            month: month,
            year: year,
            data: data[0],
            data2: data2.data,
            data3: data3.data,
            isLoaded: true
        });
    }



    componentDidMount() {
        this.getPosition()
            .then(position => {
                this.getWeather(position.coords.latitude, position.coords.longitude)

            })

            .catch(err => {
                console.log(err.message);
            });

        this.timerID = setInterval(() =>
            this.getWeather(this.state.latitude, this.state.longitude),
            600000
        );


    }
    componentWillUnmount() {
        clearInterval(this.timerID);

    }
    render() {
        const { latitude, longitude, city, isLoaded, temp, date, month, year, data, data2, data3 } = this.state;
        const list = [];
        for (let i = 1; i < data3.length; i++) {
            list.push(
                <div className='bigcard' key={i}>
                    <h4 className='date'>{month}&nbsp;/&nbsp;{date + i}&nbsp;/&nbsp;{year}</h4>
                    <h1 className='body'>High: {data3[i].high_temp}</h1>
                    <h1>Low: {data3[i].low_temp}</h1>
                </div>);
        }
        if (isLoaded) {

            return (
                <div>
                    <div className="card">
                        <h4 className='date'>{month}&nbsp;/&nbsp;{date}&nbsp;/&nbsp;{year}</h4>
                        <h4>Current weather in</h4>
                        <h1 className='biggertext'>{city}, {data.state_code}</h1>
                        <h4 className='lat'>Lat: {latitude}&nbsp;  Lon: {longitude}</h4>
                        <h1 className='body biggertext'>{temp}°F </h1>
                        <h1>{data.weather.description}</h1>
                    </div >
                    <div>
                        <h4 style={{ marginLeft: 20 }}>Extended forcast for</h4>
                        <h1 className='biggertext divider'>{city}, {data.state_code}</h1>
                    </div>
                    <div className='section'>

                        {list}
                        {/* {data3.map(obj => (
                            <div className='bigcard' key={obj}>
                                <h4 className='date'>{month}&nbsp;/&nbsp;{date}&nbsp;/&nbsp;{year}</h4>
                            </div>
                        ))} */}

                    </div>


                </div >
            );


        } else {
            return (
                <div>
                    <h1 className='loading'>Loading...</h1>
                </div>
            );
        }


    }
}

export default Weather;