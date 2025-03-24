import { CustomerInfo } from "./customer-info";
import { Promotion } from "./promotion";
import { Tour } from "./tour";

export class Booking {
    constructor(
      public idOrder: number,
     
      public adult: number,
      public children: number,
      public baby: number,

      public acceptPolice: boolean,

      public customerName: string,
      public address: string,
      public phone: string,
      public email: string,
      public notes: string,
      public evaluate: any,

      public customerInfoList: CustomerInfo[] = [],

      public total: string,

      public dateAdded: Date,
      public dateEdited: Date,
      public dateDeleted: Date,
      public account: any = {},
      public tour: Tour,
      public promotion: Promotion
    ) {}
  }
  