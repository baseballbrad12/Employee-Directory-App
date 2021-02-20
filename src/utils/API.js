import axios from 'axios';

export default function getRandomUser () {
    return axios.get("https://randomuser.me/api/?results=20");
  };
