import React, { useEffect, useState, useRef } from 'react';

import DayForecast from '../components/dayForecast';

import HourlyForecast from '../components/hourlyForecast';

export function Home() {
    
    //------------Scrolleo hacia abajo-------------//

    const [scrolled, setScrolled] = useState(false);

    //- Boton Activo -//

    const [activeButton, setActiveButton] = useState(null);

    //---------Ref Scroll a 10 days---------//

    const tenDaysRef = useRef(null);
    const TodayRef = useRef(null)
    
    //------------------------------------//

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setScrolled(scrollPosition > 150); 
    };

    const scrollToTenDays = () => {
        if (tenDaysRef.current) {
            console.log("scroll a 10 days")
            tenDaysRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToToday = () => {
        if (TodayRef.current) {
            console.log("scroll a today")
            TodayRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    //------------------------------------//

    // Parte del header //

    const [Location, setLocation] = useState(null)
    const [Region, setRegion] = useState(null)
    const [LocalTime, setLocalTime] = useState(null)
    const [FeelsLike, setFeelsLike] = useState(null)
    const [IsDay, setIsDay] = useState(null)
    const [Temp, setTemp] = useState(null)

    // 4 recuadros superiores //

    const [windSpeed, setWindSpeed] = useState(null);
    const [rainChance, setRainChance] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);

    // Sunset y Sunrise //

    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);

    // Chance de lluvias

    const [chanceOfRain, setChanceOfRain] = useState([]);

    // Temperaturas para el dayForecast
    const [temperatures, setTemperatures] = useState([]);

    //Hourly Forecast
    const [hourlyForecast, setHourlyForecast] = useState([]);


    const [error, setError] = useState(null);



    useEffect(() => {
        // Fetcheo de Datos - - Current - -

        const fetchData = async () => {
            try {
                const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=a535072b6ae44480856115549242110&q=Floridablanca&days=7&lang=es'); // Api aquí
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setTemp(data.current.temp_c)
                setLocation(data.location.name); //* Guardamos el nombre de la ubicación en el estado
                setRegion(data.location.region) //* Guardamos el nombre de la región en el estado
                setLocalTime(data.location.localtime) //* Guardamos la hora la cual define la API en el estado
                setFeelsLike(data.current.feelslike_c) //* Guardamos el nombre del valor feelslike_c ( celcius ) en el estado 
                setIsDay(data.current.is_day)

                // 4 recuadros ---
                setWindSpeed(data.current.wind_kph); // Velocidad del viento en km/h
                setRainChance(data.current.precip_mm); // Probabilidad de lluvia en mm
                setPressure(data.current.pressure_mb); // Presión en hPa
                setUvIndex(data.current.uv); // Índice UV

                // Sunset y Sunrise - astro

                setSunrise(data.forecast.forecastday[0].astro.sunrise);
                setSunset(data.forecast.forecastday[0].astro.sunset);

                // Chance of rain Aquí
                setChanceOfRain(data.forecast.forecastday[0].hour); // Almacena las horas del día

                //Temperaturas del dailyForecast
                setTemperatures(data.forecast.forecastday.map(day => day.day.avgtemp_c));

                //Logica para el HourlyForecast

                const hours = data.forecast.forecastday[0].hour.map(hour => ({
                    time: hour.time.slice(-5), // Formato HH:MM
                    temp: hour.temp_c,
                    condition: hour.condition.text // Esto puede ser útil para determinar la imagen
                }));

                //*Lo setteamos
                setHourlyForecast(hours);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();

        // - - - - - - Scrolleo - - - - - - //
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

        
    }, []);




    return(
        <main className="h-[100vh]">

            <img src="/headerimg.png" className="rounded-b-3xl w-full absolute z-[1] top-0" />

            <div className={`MainHeader z-[2] flex flex-col p-3 fixed top-0 left-0 right-0 transition-all ${scrolled ? 'bg-[#E1D3FA] backdrop-blur-md justify-start h-[220px] text-black' : 'bg-transparent justify-around h-[400px] text-white'}`}>

                    <div className="flex justify-between p-3 items-center">
                        <h1 className={`text-xl`}>{Location !== null ? `${Location}` : 'Cargando...'}, {Region !== null ? `${Region}`: `Cargando. . .`}</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 24 24"><path className={`${scrolled ? 'fill-black' : 'fill-white'}`} d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                    </div>

                    <div className="MainWeather flex items-center justify-between">
                        <div>
                            <p className="text-8xl">{Temp !== null ? `${Temp}°` : 'Cargando...'}</p>
                            <div className="feels">{FeelsLike !== null ? `Feels like ${FeelsLike}` : 'Cargando...'}</div>

                        </div>

                        <div>
                            <img src="/cloud and sun 1.png"/>
                            <p className={`${scrolled ? 'hidden' : 'block'} transition-opacity`}>Cloudy</p>
                        </div>
                        
                    </div>

                    <div className={`flex items-center justify-between ${scrolled ? 'hidden' : 'block'} transition-opacity`}>
                        <p>{LocalTime}</p>
                        <div>
                            <p>{IsDay === null ? 'Cargando...' : (IsDay === 1 ? 'Día' : 'Noche')}</p>
                            <p>Night -1°</p>
                        </div>
                    </div>

                </div>

                <div className="bg-[#F6EDFF] relative flex flex-col mt-[400px]">
                    <section className="selector flex justify-between p-3 mt-3">
                        <button className="bg-white p-2 rounded-md w-[100px] flex items-center justify-center" onClick={scrollToToday}>Today</button>
                        <button className="bg-white p-2 rounded-md w-[100px] flex items-center justify-center">Tomorrow</button>
                        <button className="bg-white p-2 rounded-md w-[100px] flex items-center justify-center" onClick={scrollToTenDays}>10 Days</button>
                    </section>

                    
                    <div className="WeatherStadistics grid grid-cols-2 gap-4 p-4">
                        <div className="bg-[#EBDEFF] p-2 rounded-xl flex justify-center items-center gap-2">

                            <div className="bg-white p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.25 5.5A3.25 3.25 0 1 1 9.5 8.75H3a.75.75 0 0 1 0-1.5h6.5A1.75 1.75 0 1 0 7.75 5.5v.357a.75.75 0 1 1-1.5 0zm8 2a4.25 4.25 0 1 1 4.25 4.25H2a.75.75 0 0 1 0-1.5h16.5a2.75 2.75 0 1 0-2.75-2.75V8a.75.75 0 0 1-1.5 0zm-11 6.5a.75.75 0 0 1 .75-.75h14.5a4.25 4.25 0 1 1-4.25 4.25V17a.75.75 0 0 1 1.5 0v.5a2.75 2.75 0 1 0 2.75-2.75H4a.75.75 0 0 1-.75-.75" clipRule="evenodd"/></svg>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm">Wind Speed</p>
                                <p>{windSpeed !==null ? `${windSpeed} Km/h` : `Cargando. . .` } </p>

                            </div>
                        </div>

                        <div className="bg-[#EBDEFF] p-2 rounded-xl flex justify-center items-center gap-2">

                            <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M12.262 36.473h29.086c7.687 0 13.406-5.836 13.406-13.078c0-7.454-6.094-12.914-14.04-12.914C37.786 4.69 32.349.964 25.575.964c-8.812 0-16.078 6.89-16.851 15.61c-4.243 1.218-7.477 4.921-7.477 9.866c0 5.532 4.031 10.032 11.016 10.032m-.047-3.774c-4.805 0-7.219-2.672-7.219-6.14c0-2.836 1.64-5.368 5.625-6.422c1.29-.328 1.758-.938 1.875-2.274c.54-7.64 6.281-13.148 13.078-13.148c5.274 0 9.422 2.883 11.953 8.086c.54 1.125 1.242 1.523 2.625 1.523c6.938 0 10.852 4.196 10.852 9.188c0 5.11-4.078 9.187-9.422 9.187Zm19.078 14.719l3.047-5.273c.422-.727.187-1.547-.516-1.946c-.703-.422-1.5-.187-1.922.54l-3.093 5.32c-.375.68-.188 1.5.539 1.922a1.43 1.43 0 0 0 1.945-.563m5.437 6.703l6.915-12c.421-.703.21-1.5-.47-1.922c-.655-.398-1.5-.187-1.945.516l-6.867 11.953c-.398.727-.21 1.547.492 1.969c.68.375 1.477.164 1.875-.516m-24.093-6.68l3.047-5.273c.421-.727.21-1.547-.493-1.945c-.726-.422-1.523-.188-1.945.539l-3.07 5.32c-.399.68-.188 1.5.515 1.898a1.403 1.403 0 0 0 1.946-.539m5.437 6.703l6.938-12c.398-.703.187-1.5-.47-1.921a1.4 1.4 0 0 0-1.944.515L15.708 52.69c-.398.727-.187 1.547.516 1.97c.68.374 1.476.163 1.851-.517"/></svg>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm">Rain Chance</p>
                                <p>{rainChance !== null ? `${rainChance}%` : 'Cargando...'}</p>

                            </div>

                        </div>

                        <div className="bg-[#EBDEFF] p-2 rounded-xl flex justify-center items-center gap-2">

                            <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M12.262 36.473h29.086c7.687 0 13.406-5.836 13.406-13.078c0-7.454-6.094-12.914-14.04-12.914C37.786 4.69 32.349.964 25.575.964c-8.812 0-16.078 6.89-16.851 15.61c-4.243 1.218-7.477 4.921-7.477 9.866c0 5.532 4.031 10.032 11.016 10.032m-.047-3.774c-4.805 0-7.219-2.672-7.219-6.14c0-2.836 1.64-5.368 5.625-6.422c1.29-.328 1.758-.938 1.875-2.274c.54-7.64 6.281-13.148 13.078-13.148c5.274 0 9.422 2.883 11.953 8.086c.54 1.125 1.242 1.523 2.625 1.523c6.938 0 10.852 4.196 10.852 9.188c0 5.11-4.078 9.187-9.422 9.187Zm19.078 14.719l3.047-5.273c.422-.727.187-1.547-.516-1.946c-.703-.422-1.5-.187-1.922.54l-3.093 5.32c-.375.68-.188 1.5.539 1.922a1.43 1.43 0 0 0 1.945-.563m5.437 6.703l6.915-12c.421-.703.21-1.5-.47-1.922c-.655-.398-1.5-.187-1.945.516l-6.867 11.953c-.398.727-.21 1.547.492 1.969c.68.375 1.477.164 1.875-.516m-24.093-6.68l3.047-5.273c.421-.727.21-1.547-.493-1.945c-.726-.422-1.523-.188-1.945.539l-3.07 5.32c-.399.68-.188 1.5.515 1.898a1.403 1.403 0 0 0 1.946-.539m5.437 6.703l6.938-12c.398-.703.187-1.5-.47-1.921a1.4 1.4 0 0 0-1.944.515L15.708 52.69c-.398.727-.187 1.547.516 1.97c.68.374 1.476.163 1.851-.517"/></svg>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm">Pressure</p>
                                <p>{pressure !== null ? `${pressure} hPa` : 'Cargando...'}</p>

                            </div>
                        </div>

                        <div className="bg-[#EBDEFF] p-2 rounded-xl flex justify-center items-center gap-2">

                            <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M12.262 36.473h29.086c7.687 0 13.406-5.836 13.406-13.078c0-7.454-6.094-12.914-14.04-12.914C37.786 4.69 32.349.964 25.575.964c-8.812 0-16.078 6.89-16.851 15.61c-4.243 1.218-7.477 4.921-7.477 9.866c0 5.532 4.031 10.032 11.016 10.032m-.047-3.774c-4.805 0-7.219-2.672-7.219-6.14c0-2.836 1.64-5.368 5.625-6.422c1.29-.328 1.758-.938 1.875-2.274c.54-7.64 6.281-13.148 13.078-13.148c5.274 0 9.422 2.883 11.953 8.086c.54 1.125 1.242 1.523 2.625 1.523c6.938 0 10.852 4.196 10.852 9.188c0 5.11-4.078 9.187-9.422 9.187Zm19.078 14.719l3.047-5.273c.422-.727.187-1.547-.516-1.946c-.703-.422-1.5-.187-1.922.54l-3.093 5.32c-.375.68-.188 1.5.539 1.922a1.43 1.43 0 0 0 1.945-.563m5.437 6.703l6.915-12c.421-.703.21-1.5-.47-1.922c-.655-.398-1.5-.187-1.945.516l-6.867 11.953c-.398.727-.21 1.547.492 1.969c.68.375 1.477.164 1.875-.516m-24.093-6.68l3.047-5.273c.421-.727.21-1.547-.493-1.945c-.726-.422-1.523-.188-1.945.539l-3.07 5.32c-.399.68-.188 1.5.515 1.898a1.403 1.403 0 0 0 1.946-.539m5.437 6.703l6.938-12c.398-.703.187-1.5-.47-1.921a1.4 1.4 0 0 0-1.944.515L15.708 52.69c-.398.727-.187 1.547.516 1.97c.68.374 1.476.163 1.851-.517"/></svg>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm">UV Index</p>
                                <p>{uvIndex !== null ? uvIndex.toFixed(1) : 'Cargando...'}</p>

                            </div>
                        </div>



                    </div>

                    <div className="flex flex-col gap-3 items-center justify-center">

                        <HourlyForecast hourlyForecast={hourlyForecast} />
                        
                        <DayForecast ref={TodayRef} temperatures={temperatures}/>

                        <div className="ChanceOfRain bg-[#EBDEFF] h-[200px] p-2 w-[93%] rounded-lg">
                            <div className="flex">
                                <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M12.262 36.473h29.086c7.687 0 13.406-5.836 13.406-13.078c0-7.454-6.094-12.914-14.04-12.914C37.786 4.69 32.349.964 25.575.964c-8.812 0-16.078 6.89-16.851 15.61c-4.243 1.218-7.477 4.921-7.477 9.866c0 5.532 4.031 10.032 11.016 10.032m-.047-3.774c-4.805 0-7.219-2.672-7.219-6.14c0-2.836 1.64-5.368 5.625-6.422c1.29-.328 1.758-.938 1.875-2.274c.54-7.64 6.281-13.148 13.078-13.148c5.274 0 9.422 2.883 11.953 8.086c.54 1.125 1.242 1.523 2.625 1.523c6.938 0 10.852 4.196 10.852 9.188c0 5.11-4.078 9.187-9.422 9.187Zm19.078 14.719l3.047-5.273c.422-.727.187-1.547-.516-1.946c-.703-.422-1.5-.187-1.922.54l-3.093 5.32c-.375.68-.188 1.5.539 1.922a1.43 1.43 0 0 0 1.945-.563m5.437 6.703l6.915-12c.421-.703.21-1.5-.47-1.922c-.655-.398-1.5-.187-1.945.516l-6.867 11.953c-.398.727-.21 1.547.492 1.969c.68.375 1.477.164 1.875-.516m-24.093-6.68l3.047-5.273c.421-.727.21-1.547-.493-1.945c-.726-.422-1.523-.188-1.945.539l-3.07 5.32c-.399.68-.188 1.5.515 1.898a1.403 1.403 0 0 0 1.946-.539m5.437 6.703l6.938-12c.398-.703.187-1.5-.47-1.921a1.4 1.4 0 0 0-1.944.515L15.708 52.69c-.398.727-.187 1.547.516 1.97c.68.374 1.476.163 1.851-.517"/></svg>
                                </div>
                                <h1 className="pl-3">Chance of rain</h1>
                            </div>

                            <div className='flex flex-col justify-center pt-3'>

                                {chanceOfRain.length > 0 ? (
                                    chanceOfRain.slice(7, 11).map((hourData, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <div className="w-1/4 pl-3">{hourData.time.split(' ')[1]}h</div>
                                            <div className="w-2/4 bg-gray-300 h-4 rounded">
                                                <div className="h-full bg-blue-500" style={{ width: `${hourData.chance_of_rain}%` }}></div>
                                            </div>
                                            <div className="w-1/4 text-right pr-3">{hourData.chance_of_rain}%</div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Cargando...</p>
                                )}

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4 flex justify-between pb-5">
                            <div className="bg-[#EBDEFF] w-[180px] p-2 rounded-lg flex justify-center items-center">

                                <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 30 30"><path fill="currentColor" d="M2.75 15.36q0-.375.3-.69c.22-.19.46-.29.7-.29h2.33c.27 0 .49.1.67.29s.27.43.27.69q0 .435-.27.72a.9.9 0 0 1-.67.29H3.75c-.27 0-.5-.1-.7-.3c-.2-.21-.3-.45-.3-.71m3.33-7.98c0-.27.09-.5.26-.68c.23-.2.46-.3.71-.3c.26 0 .49.1.68.29l1.64 1.65c.19.22.28.45.28.69c0 .28-.09.52-.27.7s-.4.28-.66.28c-.24 0-.48-.1-.7-.29L6.34 8.11c-.17-.21-.26-.46-.26-.73m2 13.5c0-.28.1-.51.29-.68c.18-.17.4-.26.68-.26h2.63l3.11-2.92c.1-.08.21-.08.34 0l3.16 2.92h2.77c.27 0 .5.09.69.28a.9.9 0 0 1 .29.67c0 .27-.1.5-.29.69s-.42.29-.69.29h-3.38c-.1 0-.2-.02-.29-.07l-2.41-2.27l-2.39 2.27c-.08.05-.17.07-.28.07H9.05a.974.974 0 0 1-.97-.99M9 15.36c0 .97.21 1.85.62 2.64c.02.12.11.18.25.18h1.88c.07 0 .12-.03.15-.08c.03-.06.02-.12-.02-.19q-.96-1.155-.96-2.55c0-1.12.4-2.08 1.2-2.87s1.76-1.18 2.89-1.18c1.12 0 2.07.39 2.86 1.18s1.19 1.74 1.19 2.87c0 .94-.32 1.79-.95 2.55c-.04.07-.05.13-.03.19s.07.08.15.08h1.9c.13 0 .21-.06.23-.18c.44-.77.64-1.65.64-2.64c0-.81-.16-1.59-.48-2.32c-.32-.74-.75-1.37-1.28-1.91a6.1 6.1 0 0 0-1.91-1.28c-.74-.32-1.51-.47-2.32-.47s-1.59.16-2.33.47c-.74.32-1.38.74-1.92 1.28A5.96 5.96 0 0 0 9 15.36m5.03-8.96V4.1c0-.29.09-.52.28-.71s.43-.28.71-.28s.51.09.7.28s.28.44.28.72v2.3c0 .29-.09.52-.28.71c-.18.18-.42.28-.7.28a.95.95 0 0 1-.71-.28a.97.97 0 0 1-.28-.72m6.35 2.64q0-.375.27-.69l1.62-1.65c.19-.19.43-.29.7-.29s.51.1.69.29c.19.19.28.42.28.69c0 .29-.09.53-.26.73L22 9.73c-.21.19-.45.29-.7.29c-.27 0-.49-.09-.66-.28s-.26-.42-.26-.7m2.61 6.32q0-.405.27-.69c.18-.19.4-.29.66-.29h2.35c.27 0 .5.1.69.29s.29.43.29.69c0 .28-.1.51-.29.71s-.42.3-.69.3h-2.35c-.27 0-.49-.1-.67-.29c-.17-.2-.26-.44-.26-.72"/></svg>
                                </div>

                                <div className="pl-3">
                                    <h1>Sunrise</h1>
                                    <p className="font-bold">{sunrise !== null ? sunrise : 'Cargando...'}</p>

                                </div>
                            </div>

                            <div className="bg-[#EBDEFF] w-[180px] p-2 rounded-lg flex justify-center items-center">

                                <div className="bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10V2m-7.07 8.93l1.41 1.41M2 18h2m16 0h2m-2.93-7.07l-1.41 1.41M22 22H2M16 6l-4 4l-4-4m8 12a4 4 0 0 0-8 0"/></svg>
                                </div>

                                <div className="pl-3">
                                    <h1>Sunset</h1>
                                    <p className="font-bold">{sunset !== null ? sunset : 'Cargando...'}</p>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="10days flex flex-col gap-5 items-center justify-center" ref={tenDaysRef}>
                        
                        <div className="bg-[#EBDEFF] w-[90%] h-[60px] p-1 rounded-lg flex justify-around items-center">
                            <div>
                                <p>Today</p>
                                <p className="text-gray-500">Cloudy and Sunny</p>
                            </div>

                            <div>
                                <p>3°</p>
                                <p>-2°</p>
                            </div>

                            <div className="separator bg-black h-[30px] w-[1px]"></div>

                            <div>
                                <img src="/gray cloud and sun.png" alt="" />
                            </div>
                        </div>

                    </div>
                    
                </div>



        </main>
    )
}