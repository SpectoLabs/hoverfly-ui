export interface Notification {
  message: string;
  type: string;
}

export const NOTIFICATION_TYPE = {
  ERROR: 'ERROR',
  INFORMATION: 'INFORMATION'
};