import { IAuthService } from "../service/authService";
import { IChildService } from "../service/childService";
import { IMeasurementService } from "../service/measurementService";

export type Injections = IAuthService & IChildService & IMeasurementService;