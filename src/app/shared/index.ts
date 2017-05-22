import { AuthGuard } from "./guards/auth.guard";
import { HoverflyService } from "./services/hoverfly.service";
export const ngModuleSharedProviders = [
  AuthGuard,
  HoverflyService
];