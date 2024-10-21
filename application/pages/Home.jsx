export function Home() {
    return(
        <main className="h-[100vh]">

                <img src="/headerimg.png" className="rounded-b-3xl w-[100%] fixed z-[-2]"/>

            
                <div className="MainHeader text-white flex flex-col justify-around h-[400px]">

                    <div className="flex justify-between p-3 items-center">
                        <h1 className="text-white text-xl">Floridablanca, Santander</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" viewBox="0 0 24 24"><path fill="#fff" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                    </div>

                    <div className="MainWeather flex items-center justify-between p-2">
                        <p className="text-8xl">3°</p>
                        <div className="feels">Feels like -2°</div>

                        <div>
                            <img src="/cloud and sun 1.png"/>
                            <p>Cloudy</p>
                        </div>
                        
                    </div>

                    <div className="bottomHeader flex items-center justify-between p-2">
                        <p>January 18, 16:14</p>
                        <p>Day</p>
                        <p>Night -1°</p>
                    </div>

                </div>

                <div className="bg-[#F6EDFF] relative z-[-3]">
                    <section className="selector flex justify-between p-3 mt-3">
                        <button className="bg-white p-2 font-bold rounded-md w-[100px] flex items-center justify-center">Today</button>
                        <button className="bg-white p-2 font-bold rounded-md w-[100px] flex items-center justify-center">Tomorrow</button>
                        <button className="bg-white p-2 font-bold rounded-md w-[100px] flex items-center justify-center">10 Days</button>
                    </section>

                    
                </div>

                <div className="WeatherStadistics grid grid-cols-2">
                    <div className="bg-[#EBDEFF]">

                        <h1>Wind Speed</h1>
                        <p>12 Km/h</p>
                    </div>

                    <div className="bg-[#EBDEFF]">
                        <h1>Rain Chance</h1>
                        <p>12 Km/h</p>
                    </div>

                    <div className="bg-[#EBDEFF]">

                    </div>

                    <div className="bg-[#EBDEFF]">

                    </div>



                </div>


        </main>
    )
}