import { Booking } from "./booking";

export class Tour {
  constructor(
    public idTour: number,
    public titleTour: string,
    public price: number,
    public childPrice: number,
    public babyPrice: number,
    public sale: number,
    public departureDate: Date,
    public returnDate: Date,
    public description: string,
    public address: string,
    public duration: string,
    public type: string,
    public tagId: number,
    public serviceId: number,
    public views: number,
    public votes: number,
    public status: number,
    public purchaseCount: number,
    public statusAction: string,
    public dateAdded: Date,
    public dateEdited: Date,
    public dateDeleted: Date,
    public bookings: Booking[] = [],
    public image: string,
    public favorites: any[] = []
  ) { }
}
