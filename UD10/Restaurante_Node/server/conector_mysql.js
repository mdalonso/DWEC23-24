"use strict";

import {createPool} from 'mysql2/promise';
//import { DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER } from '../config.js';

const conexion=createPool({
    "host":"localhost",
    "user":"root",
    "password":"",
    "database":"restaurantestrass",
    //"port":3306
})

export default conexion;