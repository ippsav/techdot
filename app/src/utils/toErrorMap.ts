import { FieldError } from "../generated/graphql";

export const toErrorMap = (
  errors: Array<FieldError>
): Record<string, string> => {
  let map: Record<string, string> = {};
  errors.map(({ field, message }) => {
    map[field] = message;
  });
  return map;
};
