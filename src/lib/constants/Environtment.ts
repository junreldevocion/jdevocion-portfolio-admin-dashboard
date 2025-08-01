export class Environment {
  static API_URL = process.env.API_URL || 'http://localhost:3001';
  static DEV_URL = process.env.DEV_URL || 'http://localhost:3000';
}