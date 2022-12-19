export interface ICountry {
    cities: ICity[],
    code: string,
    countryCode: string,
    currency: string,
    currencyCode: string,
    currencySymbol: string,
    description: string,
    id: string,
    lgas: ILga[],
    nationality: string,
    states: IState[]
}

export interface IState {
    code: string,
    countryId: string,
    description: string,
    id: string
}

export interface ICity {
    code: string,
    countryStateId: string,
    description: string,
    id: string
}

export interface ILga {
    code: string,
    countryStateId: string,
    description: string,
    id: string
}