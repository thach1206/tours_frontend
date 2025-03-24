export class Promotion {
    constructor(
        public id: number,
        public code: string,
        public discountPercentage: number,
        public maxDiscountAmount: number,
        public description: string,
        public qualityOnHand: number,
        public hidden: boolean,
        public active: boolean,
        public statusAction: string,
        public dateAdded: Date,
        public dateEdited: Date,
        public dateDeleted: Date,
        public startDate: Date,
        public endingDate: Date) {}
}