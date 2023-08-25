export interface ICommonState {
   isCountryLoading: boolean;
   isStateLoading: boolean;
   isStateByCountryLoading: boolean;
   countryData: {
    CountryId: string;
    CountryCode: string;
    CountryName: string;
   }[];
   stateData: {
    StateId: string,
    StateCountryName: string;
    StateName: string;
   }[],
   stateDataByCountry: {
    StateId: string;
    StateCountryName: string;
    StateName: string;
   }[],
   countryError: any;
   stateError: any;
   stateByCountryError: any;
  }