import { IVehicleModel } from "./vehicleModels";

export interface IVehicleBrand {
    code: string,
    description: string,
    id: string,
    models: IVehicleModel[]
}