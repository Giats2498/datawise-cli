import {all} from "redux-saga/effects";
import {entityOperations, entityType} from "./module";
import getCoreSagas from "reactcoregk/store/saga";
import {ApiEndpoint} from "../@core/endpoint";

const coreSagas = getCoreSagas(entityType, ApiEndpoint, entityOperations)

function* sagas() {
    yield all(coreSagas);
}

export default sagas;
