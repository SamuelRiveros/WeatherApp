import React from 'react';

const HourlyForecast = ({ hourlyForecast }) => {
    const getImageSrc = (temp) => {
        if (temp <= 10) {
            return "/gray cloud and sun.png";
        } else if (temp <= 20) {
            return "/cloud.png";
        } else {
            return "/cloud and sun 1.png";
        }
    };

    return (
        <div className="HourlyForecast bg-[#EBDEFF] h-[150px] p-2 w-[93%] rounded-lg overflow-hidden">
            <div className="flex">
                <div className="flex bg-white p-2 rounded-full w-[30px] h-[30px] items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 0l2 3m-2-8v5"/>
                    </svg>
                </div>
                <h1 className="pl-3">Hourly Forecast</h1>
            </div>

            <div className='flex overflow-x-auto pt-3 gap-1 scrollbar-hide'>
                {hourlyForecast.map((hour, index) => (
                    <div key={index} className='flex flex-col justify-center items-center w-[50px] flex-shrink-0'>
                        <p className='text-sm'>{hour.time}</p>
                        <img src={getImageSrc(hour.temp)} className='w-10' alt={`Weather at ${hour.time}`} />
                        <p>{hour.temp}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
