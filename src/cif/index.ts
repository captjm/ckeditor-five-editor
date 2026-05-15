// src/cif/index.ts

import {CifManager} from './CifManager';

const manager = new CifManager();
manager.expose();

export default manager;

export {CifManager} from './CifManager';
export {CifApi} from './CifApi';