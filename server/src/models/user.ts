export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser {
  id: number;
  username: string;
  email: string;
}

export const isValidUser = (user: any): user is User => {
  return (
    typeof user.id === 'number' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.password === 'string' &&
    user.createdAt instanceof Date &&
    user.updatedAt instanceof Date
  );
};
