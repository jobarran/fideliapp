import bcryptjs from 'bcryptjs';


interface SeedUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
  role: 'admin'|'user'
}

interface SeedData {
  users: SeedUser[];
}


export const initialData: SeedData = {

  users: [
    {
      email: 'joaquinbarrandeguy@gmail.com',
      name: 'Joaquin ',
      lastName: 'Barrandeguy',
      password: bcryptjs.hashSync('123456'),
      role: 'admin'
    },
    {
      email: 'martinadeluca@gmail.com',
      name: 'Martina ',
      lastName: 'De Luca',
      password: bcryptjs.hashSync('123456'),
      role: 'user'
    },


  ],

}