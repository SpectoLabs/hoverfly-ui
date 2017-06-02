import { AuthGuard } from './guards/auth.guard';
import { HoverflyService } from './services/hoverfly.service';
import { AuthService } from './services/auth.service';
export const ngModuleSharedProviders = [
  AuthGuard,
  HoverflyService,
  AuthService
];
