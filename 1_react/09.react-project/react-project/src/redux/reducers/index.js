import { combineReducers } from 'redux'

import user from './user';
import categories from './category';
import roles from "./role"

export default combineReducers({ user, categories, roles })