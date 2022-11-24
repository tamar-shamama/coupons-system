
class CouponModel {

    public id: number;
    public title: string;
    public description: string;
    public startDate : Date;
    public expirationDate : Date;
    public amount: number;
    public price: number;
    // public image: File | FileList | null;
    public image: string;
    public category: string;

}

export default CouponModel;
