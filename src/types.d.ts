export interface GeoLocation {
    IPv4: string;
    city: string;
    country_code: string;
    country_name: string;
    latitude: number;
    longitude: number;
    postal: string;
    state: string;
}

export interface WeatherAPIResponse {
    coord: { lon: number, lat: number },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: { speed: number, deg: number, gust: number },
    clouds: { all: number },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}

/* -------------------------------------------------- UTILITY --------------------------------------------------*/
export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export interface Variants {
	[key: string]: {
		[key: string]: string;
	};
}

export interface Options {
	variants: Variants;
	defaultVariants: {
		[key: string]: string;
	};
}
