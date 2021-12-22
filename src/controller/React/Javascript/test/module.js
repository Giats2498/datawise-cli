import {EntityType} from "../@core/entityType";
import {Operation} from "reactcoregk";

export const entityType = EntityType.Test;
export const entityOperations = [
  Operation.getAll,
  Operation.create,
  Operation.delete,
  Operation.update,
];
