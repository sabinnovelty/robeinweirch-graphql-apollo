import { PubSub } from 'apollo-server';
import { MESSAGE_CREATED } from './events';


export const EVENTS = {
    MESSAGE: MESSAGE_CREATED
};

export default new PubSub();