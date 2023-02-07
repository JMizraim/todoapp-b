/* 
    JMizraim 2022
*/

import dotenv from 'dotenv';
dotenv.config();

import { Server } from './models';

const server = Server.instance;

server.listen();
