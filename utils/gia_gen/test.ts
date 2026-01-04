// 生成类似这样的结构
export const ItemIds =  {
  /**
   * **Rusty Sword**
   * Doc here...
   */
  SwordRusty: "sword_rusty",
  
  /**
   * **Golden Shield**
   * Doc here...
   */
  ShieldGold : "shield_gold",
} as const;

console.log(ItemIds.ShieldGold);