import {entityType} from "./module";
import {createDeleteMethod, createGetAllMethod, createPostMethod, createPutMethod} from "reactcoregk/store/actions";
import {getDefaultApiHandler} from "../../Utils";

export const getAllTests = params => createGetAllMethod(entityType, params, getDefaultApiHandler());
export const deleteTest = payload => createDeleteMethod(entityType, payload, getDefaultApiHandler());
export const createTest = payload => createPostMethod(entityType, payload, getDefaultApiHandler());
export const updateTest = payload => createPutMethod(entityType, payload, getDefaultApiHandler());
