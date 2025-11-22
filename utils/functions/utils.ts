export const AllTypes = ["int", "float", "bool", "str", "Int", "Float", "Bool", "Str", "Vec", "GUID", "Entity", "Prefab", "Faction", "ConfigId", "List", "Dict", "Struct"] as const;

export const SysEnumNames = [
  "EnumGeneric",
  "EnumComparisonOperators",
  "EnumLogicalOperators",
  "EnumMathematicalOperators",
  "EnumAttackShapes",
  "EnumSurvivalStatus",
  "EnumSortingRules",
  "EnumRoundingLogic",
  "EnumTypeConversions",
  "EnumMotionPathPointTypes",
  "EnumMotionTypes",
  "EnumFollowLocationType",
  "EnumCoordinateSystemType",
  "EnumElementalType",
  "EnumEntityType",
  "EnumUnitStatusAdditionResult",
  "EnumUnitStatusRemovalReason",
  "EnumUnitStatusRemovalStrategy",
  "EnumRevivePointSelectionStrategy",
  "EnumCauseOfBeingDown",
  "EnumTrigonometricFunctions",
  "EnumDisruptorDeviceTypes",
  "EnumDisruptorDeviceOrientation",
  "EnumUIControlGroupStatus",
  "EnumTargetType",
  "EnumTriggerRestriction",
  "EnumHitType",
  "EnumAttackType",
  "EnumHitPerformanceLevel",
  "EnumSkillSlot",
  "EnumSoundAttenuationMode",
  "EnumSelectCompletionReason",
  "EnumSettlementStatus",
  "EnumReasonForItemChange",
  "EnumItemLootType",
  "EnumDecisionRefreshMode",
  "EnumElementalReactionType",
  "EnumInterruptStatus",
  "EnumGameplayMode",
  "EnumInputDeviceType"
] as const;

export const AllKeyTypes = ["Entity", "GUID", "Int", "Str", "int", "str", "Faction", "ConfigId", "Prefab"] as const;
export const AllItemTypes = ["Entity", "GUID", "Int", "Bool", "Float", "Str", "int", "bool", "float", "str", "Faction", "Vec", "ConfigId", "Prefab"] as const;
export const AllValTypes = [...AllItemTypes, "List"] as const;
const INT = ["int", "Int"] as const;
const BOOL = ["bool", "Bool"] as const;
const FLOAT = ["float", "Float"] as const;
const STR = ["str", "Str"] as const;

const any_type = [...AllTypes];
const any_enums = [...SysEnumNames];
const any_list_item_type = [...AllItemTypes];
const any_map_key_type = [...AllKeyTypes];
const any_map_val_type = [...AllValTypes];
const any_int = [...INT];
const any_float = [...FLOAT];
const any_bool = [...BOOL];
const any_str = [...STR];
export {
  any_type,
  any_enums,
  any_list_item_type,
  any_map_key_type,
  any_map_val_type,
  any_int,
  any_float,
  any_bool,
  any_str,
};