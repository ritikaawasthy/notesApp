import axios from 'axios';
import {token} from '../encodedtoken';

const getNotes=async(token)=>
 await axios.get('api/notes',
 {headers: {authorization: token}
});

export {getNotes}
