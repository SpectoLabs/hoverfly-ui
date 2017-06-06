import { AuthGuard } from './guards/auth.guard';
import { HoverflyService } from './services/hoverfly.service';
import { AuthService } from './services/auth.service';
import { LoadGuard } from './guards/load.guard';
export const ngModuleSharedProviders = [
  AuthGuard,
  HoverflyService,
  AuthService,
  LoadGuard
];
