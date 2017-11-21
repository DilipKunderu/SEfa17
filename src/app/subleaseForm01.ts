export class BasicDetails {

    constructor (
        public owner: string,
        public zipcode: string,
        public description: string,
        public accomodates: string,
        public bathrooms: string,
        public bathroomtype: string,
        public bedrooms: string,
        public roomtype: string,
        public beds: string,
        public studio: boolean,
        public petfriendly: boolean,
        public kitchen: boolean,
        public airconditioning: boolean,
        public tv: boolean,
        public heating: boolean,
        public washer_dryer: boolean,
        public free_parking_on_premises: boolean,
        public free_parking_on_street: boolean,
        public wireless_internet: boolean,
        public suitable_for_events: boolean,
        public smoking_allowed: boolean,
        public wheelchair_accessible: boolean,
        public elevator: boolean,
        public pool: boolean,
        public gym: boolean,
        public bathtub: boolean,
        public rent: string,
        public start_date: Date,
        public end_date: Date
    ) {}
}
