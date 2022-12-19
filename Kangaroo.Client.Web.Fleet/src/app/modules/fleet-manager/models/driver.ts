import {Document} from "./document";

export interface Driver {
  archived: boolean,
  address1: string;
  address2: string;
  alternateEmail: string;
  cityId: string;
  cityName: string;
  countryId: string;
  countryName: string;
  doB: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isActive: boolean,
  lgaId: string;
  lgaName: string;
  maritalStatus: string;
  middleName: string;
  phone1: string;
  phone2: string;
  photoUrl: string;
  postalCode: string;
  stateId: string;
  stateName: string;
  surname: string;
  title: string;
  titleId: string;
  dateAdded: string;
  numberOfRides: string;
  status: string;
}
