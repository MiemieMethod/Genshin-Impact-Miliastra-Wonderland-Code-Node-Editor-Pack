## I. Character Skills

## **1\. Traverse Entity List**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/a1764fe9-e666-4ed5-8b35-6c8cec9f5a72.png)

**Node Functions**

Iterates through each Entity in the input Entity List

**Node Parameters**

|  **Parameter Type**  | **Parameter Name** |    **Type**     | **Description** |
|------------------|----------------|-------------|-------------|
| Input Parameter  |  Entity List   | Entity List |             |
| Output Parameter | Current Entity |   Entity    |             |

## **2\. Play Timed Effects**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/9d9f99a2-538e-4c71-8891-36cc655c8bfe.png)

**Node Functions**

Plays Timed Effects at the specified World Location

**Node Parameters**

| **Parameter Type**  |             **Parameter Name**             |          **Type**          | **Description** |
|-----------------|----------------------------------------|------------------------|-------------|
| Input Parameter | Special Effects Asset Configuration ID |       Config ID        |             |
| Input Parameter |                Location                |       3D Vector        |             |
| Input Parameter |                 Rotate                 |       3D Vector        |             |
| Input Parameter |            Zoom Multiplier             | Floating Point Numbers |             |
| Input Parameter |      Play Default Sound Effects?       |        Boolean         |             |

## **3\. Fixed-Point Projectile Launch**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/6848f194-4a09-43a1-8931-de3a9da0087c.png)

**Node Functions**

Spawns a Local Projectile at the specified Location in the World Coordinate System

**Node Parameters**

| **Parameter Type**  |     **Parameter Name**     |   **Type**    | **Description** |
|-----------------|------------------------|-----------|-------------|
| Input Parameter | Projectile's Prefab ID | Prefab ID |             |
| Input Parameter |    Create Location     | 3D Vector |             |
| Input Parameter |    Create Rotation     | 3D Vector |             |
| Input Parameter |      Track Target      |  Entity   |             |
| Input Parameter |   Projectile Faction   |  Faction  |             |

## **4\. Fixed-Point Displacement**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/9f98a768-959b-4f44-b72d-80dffc660e64.png)

**Node Functions**

Moves from the current Location to the Target Location

Supports configuring movement duration and speed; if both are small, the movement may not reach the Target Location

**Node Parameters**

| **Parameter Type**  |           **Parameter Name**            |          **Type**          | **Description** |
|-----------------|-------------------------------------|------------------------|-------------|
| Input Parameter |        Displacement Duration        | Floating Point Numbers |             |
| Input Parameter |  Displacement Attenuation Duration  | Floating Point Numbers |             |
| Input Parameter |         Displacement Speed          | Floating Point Numbers |             |
| Input Parameter |    Displacement Target Location     |       3D Vector        |             |
| Input Parameter | Terminate Displacement on Collision |        Boolean         |             |

## **5\. Recover HP**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/04ff6b6d-4df1-41d1-8244-ccc09db2160e.png)

**Node Functions**

Initiates a one-time HP restoration for the Target Entity

**Node Parameters**

| **Parameter Type**  |          **Parameter Name**           |          **Type**          | **Description** |
|-----------------|-----------------------------------|------------------------|-------------|
| Input Parameter |           Target Entity           |         Entity         |             |
| Input Parameter |          Recovery Amount          | Floating Point Numbers |             |
| Input Parameter | Ignore Recovery Adjustment Effect |        Boolean         |             |
| Input Parameter | Aggro Multiplier for This Healing | Floating Point Numbers |             |
| Input Parameter | Aggro Increment for This Healing  |        Integer         |             |

## **6\. Camera Orientation Detection Data**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/42fb8770-d7f1-41e6-8356-a4e210aa0b1b.png)

**Node Functions**

Casts a ray from the Camera to the emission Location and returns the Rotation and Location of valid Targets along the path

**Node Parameters**

|  **Parameter Type**  |  **Parameter Name**   |          **Type**          | **Description** |
|------------------|-------------------|------------------------|-------------|
| Input Parameter  |    Target Type    |      Enumeration       |             |
| Input Parameter  |  Launch Location  |       3D Vector        |             |
| Input Parameter  | Nearest Distance  | Floating Point Numbers |             |
| Input Parameter  | Furthest Distance | Floating Point Numbers |             |
| Output Parameter |  Target Rotation  |       3D Vector        |             |
| Output Parameter |  Target Location  |       3D Vector        |             |

## **7\. Force Exit Aiming State**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/69892f47-a438-4f7c-850e-bae6a38725e1.png)

**Node Functions**

Forces the Character to exit Aiming Status if the Character is currently in it

**Node Parameters**

| **Parameter Type** | **Parameter Name** | **Type** | **Description** |
|----------------|----------------|------|-------------|
|                |                |      |             |

## **8\. Set Own Attack Target**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/c5d18832-eb2b-4d06-b581-6525367f03eb.png)

**Node Functions**

Sets the Target Entity as its Attack Target

**Node Parameters**

| **Parameter Type**  |       **Parameter Name**        |  **Type**   | **Description** |
|-----------------|-----------------------------|---------|-------------|
| Input Parameter |        Target Entity        | Entity  |             |
| Input Parameter | Whether to Turn Immediately | Boolean |             |

## **9\. Trigger Hitbox at Specific Location**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/5faf6f3e-64fb-4575-86c7-65ce875e7818.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/46ae281b-280e-4fcb-b6a1-d4bb1e70f153.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/3b8ee4f3-1ebc-4ab3-b5ae-10ef9851e9e3.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/c863cb63-3dfa-4ced-9ed3-3e041c13c674.png)

**Node Functions**

Initiates a Hitbox Attack at the specified Location in the World Coordinate System, with configurable attack parameters

**Node Parameters**

| **Parameter Type**  |            **Parameter Name**             |          **Type**          | **Description** |
|-----------------|---------------------------------------|------------------------|-------------|
| Input Parameter |         Target Faction Filter         |      Enumeration       |             |
| Input Parameter |               Location                |       3D Vector        |             |
| Input Parameter |                Rotate                 |       3D Vector        |             |
| Input Parameter |          Damage Coefficient           | Floating Point Numbers |             |
| Input Parameter |           Damage Increment            | Floating Point Numbers |             |
| Input Parameter |    Hitbox Entity Type Filter List     |      Faction List      |             |
| Input Parameter |             Trigger Type              |      Enumeration       |             |
| Input Parameter |         On-Hit Scene Effects          |        Integer         |             |
| Input Parameter |              Hitbox Type              |      Enumeration       |             |
| Input Parameter |        Scale of Cuboid Hitbox         |      Enumeration       |             |
| Input Parameter |        Radius of Sphere Hitbox        |        Boolean         |             |
| Input Parameter |        Height of Sector Hitbox        | Floating Point Numbers |             |
| Input Parameter |     Sector Angle of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter |    Sector Radius of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter |     Inner Radius of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter | Detection Direction of Sector Hitbox  |      Enumeration       |             |
| Input Parameter |          Attack Layer Filter          |      Enumeration       |             |
| Input Parameter |            Attack Tag List            |      String List       |             |
| Input Parameter |            Elemental Type             |      Enumeration       |             |
| Input Parameter |       Elemental Attack Potency        | Floating Point Numbers |             |
| Input Parameter |               Hit Type                |      Enumeration       |             |
| Input Parameter |              Attack Type              |      Enumeration       |             |
| Input Parameter |            Interrupt Value            | Floating Point Numbers |             |
| Input Parameter |            Absolute Damage            |        Boolean         |             |
| Input Parameter |        On-Hit Special Effects         |        Integer         |             |
| Input Parameter |         Knockback Orientation         |      Enumeration       |             |
| Input Parameter |          Block Damage Pop-Up          |        Boolean         |             |
| Input Parameter |      On-Hit Scene Effects Offset      |       3D Vector        |             |
| Input Parameter |     On-Hit Scene Effects Rotation     |       3D Vector        |             |
| Input Parameter |       On-Hit Scene Effects Zoom       | Floating Point Numbers |             |
| Input Parameter |  On-Hit Scene Special Effects Offset  |       3D Vector        |             |
| Input Parameter | On-Hit Scene Special Effects Rotation |       3D Vector        |             |
| Input Parameter |   On-Hit Scene Special Effects Zoom   | Floating Point Numbers |             |
| Input Parameter |   Aggro Multiplier for This Attack    | Floating Point Numbers |             |
| Input Parameter |    Aggro Increment for This Attack    |        Integer         |             |
| Input Parameter |               Hit Level               |      Enumeration       |             |
| Input Parameter |       On-Hit Horizontal Impulse       | Floating Point Numbers |             |
| Input Parameter |        On-Hit Vertical Impulse        | Floating Point Numbers |             |

## **10\. Add Unit Status**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/69c3c66c-b958-48ec-9607-ba73b072a955.png)

**Node Functions**

Applies the Unit Status defined by the configuration ID to the Target

**Node Parameters**

| **Parameter Type**  |    **Parameter Name**     |   **Type**    | **Description** |
|-----------------|-----------------------|-----------|-------------|
| Input Parameter |  Application Target   |  Entity   |             |
| Input Parameter |        Stacks         |  Integer  |             |
| Input Parameter | Unit Status Config ID | Config ID |             |

## **11\. Notify Server Node Graph**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/519d9a18-d10a-449a-ae63-0420dbe098fb.png)

**Node Functions**

Notifies the Server Node Graph; supports up to three String parameters

At runtime, forwards logic to the Server Node Graph and triggers the \[On Skill Node Call\] Event on the Server Node Graph

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**  | **Description** |
|-----------------|----------------|--------|-------------|
| Input Parameter |    String 1    | String |             |
| Input Parameter |    String 2    | String |             |
| Input Parameter |    String 3    | String |             |

## **12\. Player Turning**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/1442a578-d8af-478c-9ada-f5263eceecf1.png)

**Node Functions**

Turns the Player using the configured turning mode

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |    **Type**     |                                                       **Description**                                                       |
|-----------------|----------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| Input Parameter |  Turning Mode  | Enumeration | Includes: Target then Input, Input Direction, Target Direction, Target then Camera, Camera Direction, Input then Target |

## **13\. Player Turns to Face Set Direction**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/1b144cba-4276-44f8-8f9c-f048c4fc6947.png)

**Node Functions**

Turns the Player toward the direction specified by the 3D Vector configuration

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |   **Type**    | **Description** |
|-----------------|----------------|-----------|-------------|
| Input Parameter |  Orientation   | 3D Vector |             |

## **14\. Modify Attack Weight**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/2292d8e0-0763-41b0-8f2a-f2a0aba9639c.png)

**Node Functions**

Edits the weight of the current Attack Target

**Node Parameters**

| **Parameter Type**  |        **Parameter Name**         |          **Type**          | **Description** |
|-----------------|-------------------------------|------------------------|-------------|
| Input Parameter | Current Attack Target Weight  | Floating Point Numbers |             |
| Input Parameter | Forcibly Select a Target Once |        Boolean         |             |

## **15\. Remove Unit Status**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/b8e56b34-3d90-467d-8a26-37af9c60b460.png)

**Node Functions**

Removes the Unit Status corresponding to the specified configuration ID from the Target Entity

**Node Parameters**

| **Parameter Type**  |    **Parameter Name**     |   **Type**    | **Description** |
|-----------------|-----------------------|-----------|-------------|
| Input Parameter |    Removal Target     |  Entity   |             |
| Input Parameter | Unit Status Config ID | Config ID |             |

## **16\. Remove Specified Character Disruptor Device**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/447e06ed-daf0-4033-b75c-6e1e8d9a5a18.png)

**Node Functions**

Removes the specified type of Character Disruptor Device

**Node Parameters**

| **Parameter Type**  |    **Parameter Name**     |    **Type**     |                        **Description**                         |
|-----------------|-----------------------|-------------|------------------------------------------------------------|
| Input Parameter | Disruptor Device Type | Enumeration | Includes: Force Field Device, Ejector, and Traction Device |

## **17\. Trigger Hitbox at Specific Location**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/1e8ec793-d761-4ace-b6d1-258a792715c9.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/516aed42-9a70-44d0-806b-762825b96c54.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/08591c07-f46b-4663-b224-4038402069f4.png)

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/bd16ca81-1b7d-4dd8-8837-c3d619d55e10.png)

**Node Functions**

Initiates a Hitbox Attack at the specified Attachment Point, with configurable attack parameters

**Node Parameters**

| **Parameter Type**  |            **Parameter Name**             |          **Type**          | **Description** |
|-----------------|---------------------------------------|------------------------|-------------|
| Input Parameter |         Target Faction Filter         |      Enumeration       |             |
| Input Parameter |               Location                |         String         |             |
| Input Parameter |                Rotate                 |       3D Vector        |             |
| Input Parameter |          Damage Coefficient           |       3D Vector        |             |
| Input Parameter |           Damage Increment            | Floating Point Numbers |             |
| Input Parameter |    Hitbox Entity Type Filter List     | Floating Point Numbers |             |
| Input Parameter |             Trigger Type              |      Faction List      |             |
| Input Parameter |         On-Hit Scene Effects          |      Enumeration       |             |
| Input Parameter |              Hitbox Type              |        Integer         |             |
| Input Parameter |        Scale of Cuboid Hitbox         |      Enumeration       |             |
| Input Parameter |        Radius of Sphere Hitbox        |      Enumeration       |             |
| Input Parameter |        Height of Sector Hitbox        |        Boolean         |             |
| Input Parameter |     Sector Angle of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter |    Sector Radius of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter |     Inner Radius of Sector Hitbox     | Floating Point Numbers |             |
| Input Parameter | Detection Direction of Sector Hitbox  | Floating Point Numbers |             |
| Input Parameter |          Attack Layer Filter          |      Enumeration       |             |
| Input Parameter |            Attack Tag List            |      Enumeration       |             |
| Input Parameter |            Elemental Type             |      String List       |             |
| Input Parameter |       Elemental Attack Potency        |      Enumeration       |             |
| Input Parameter |               Hit Type                | Floating Point Numbers |             |
| Input Parameter |              Attack Type              |      Enumeration       |             |
| Input Parameter |            Interrupt Value            |      Enumeration       |             |
| Input Parameter |            Absolute Damage            | Floating Point Numbers |             |
| Input Parameter |        On-Hit Special Effects         |        Boolean         |             |
| Input Parameter |         Knockback Orientation         |        Integer         |             |
| Input Parameter |          Block Damage Pop-Up          |      Enumeration       |             |
| Input Parameter |      On-Hit Scene Effects Offset      |        Boolean         |             |
| Input Parameter |     On-Hit Scene Effects Rotation     |       3D Vector        |             |
| Input Parameter |       On-Hit Scene Effects Zoom       |       3D Vector        |             |
| Input Parameter |  On-Hit Scene Special Effects Offset  | Floating Point Numbers |             |
| Input Parameter | On-Hit Scene Special Effects Rotation |       3D Vector        |             |
| Input Parameter |   On-Hit Scene Special Effects Zoom   |       3D Vector        |             |
| Input Parameter |   Aggro Multiplier for This Attack    | Floating Point Numbers |             |
| Input Parameter |    Aggro Increment for This Attack    | Floating Point Numbers |             |
| Input Parameter |               Hit Level               |        Integer         |             |
| Input Parameter |       On-Hit Horizontal Impulse       |      Enumeration       |             |
| Input Parameter |        On-Hit Vertical Impulse        | Floating Point Numbers |             |
| Input Parameter |         Hit Vertical Impulse          | Floating Point Numbers |             |

## **18\. Reset Skill Target**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/488e4197-4990-43f5-a22d-7cac4d3a3f2a.png)

**Node Functions**

Resets the Skill Target and reruns the Skill selection logic to choose a new Target

**Node Parameters**

| **Parameter Type** | **Parameter Name** | **Type** | **Description** |
|----------------|----------------|------|-------------|
|                |                |      |             |

## **1\. Set Local Variable**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/4d3f2985-476c-4eb4-b314-4d0fd8a89889.png)

**Node Functions**

Sets the value of a local variable

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**   | **Description** |
|-----------------|----------------|---------|-------------|
| Input Parameter | Variable Name  | String  |             |
| Input Parameter | Variable Value | Generic |             |

## **2\. Break Loop**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/a36ba83b-172c-4b68-bdfd-e34646637122.png)

**Node Functions**

Break out of a Finite Loop. The output pin must connect to the \[Break Loop\] input parameter of the \[Finite Loop\] Node

**Node Parameters**

| **Parameter Type** | **Parameter Name** | **Type** | **Description** |
|----------------|----------------|------|-------------|
|                |                |      |             |

## **3\. Finite Loop**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/bb7d7312-442d-4179-ab19-59de6519666d.png)

**Node Functions**

From the \[Loop Start Value\] to the \[Loop End Value\], the loop iterates, incrementing the Integer by 1 each time. On each iteration, it executes the Nodes connected to \[Loop Body\]. After a full iteration, it executes the Nodes connected to \[Loop Complete\].

Use \[Break Loop\] to end the iteration early

**Node Parameters**

|  **Parameter Type**  |     **Parameter Name**     |  **Type**   | **Description** |
|------------------|------------------------|---------|-------------|
| Input Parameter  |    Loop Start Value    | Integer |             |
| Input Parameter  | Loop Termination Value | Integer |             |
| Output Parameter |   Current Loop Value   | Integer |             |

## III. Custom Aggro

## **1\. Modify the Aggro Value of the Specified Entity Proportionally**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/e1d0461c-b67a-401e-ac58-8732ef56e243.png)

**Node Functions**

Available only in Custom Aggro Mode

Proportionally edits the Target Entity's Aggro Value on the specified Aggro Owner

**Node Parameters**

| **Parameter Type**  |       **Parameter Name**       |          **Type**          | **Description** |
|-----------------|----------------------------|------------------------|-------------|
| Input Parameter |       Target Entity        |         Entity         |             |
| Input Parameter |     Aggro Owner Entity     |         Entity         |             |
| Input Parameter | Modified Aggro Value Ratio | Floating Point Numbers |             |

## **2\. Transfer the Aggro Value of the Specified Entity Proportionally**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/348e3186-ae4c-4f0f-8ea7-39ac67c62917.png)

**Node Functions**

Available only in Custom Aggro Mode

Transfers a percentage of Aggro on the Aggro Owner from the Source Entity to the Target Entity

**Node Parameters**

| **Parameter Type**  |     **Parameter Name**     |          **Type**          | **Description** |
|-----------------|------------------------|------------------------|-------------|
| Input Parameter | Transfer Target Entity |         Entity         |             |
| Input Parameter | Transfer Source Entity |         Entity         |             |
| Input Parameter |   Aggro Owner Entity   |         Entity         |             |
| Input Parameter |     Transfer Ratio     | Floating Point Numbers |             |

## **3\. Taunt Target**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/70bbf21c-3025-4dfa-ab17-c1df6a08824b.png)

**Node Functions**

Available only in Custom Aggro Mode

The Taunter Entity taunts the specified Target Entity

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**  | **Description** |
|-----------------|----------------|--------|-------------|
| Input Parameter | Taunter Entity | Entity |             |
| Input Parameter | Target Entity  | Entity |             |

## **4\. Remove Target Entity From Aggro List**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/235e12ab-d72c-42dc-a268-906648cc4446.png)

**Node Functions**

Available only in Custom Aggro Mode

Removes the Target Entity from the Aggro Owner Entity's Aggro List; this may cause the Target Entity to leave battle

**Node Parameters**

| **Parameter Type**  |   **Parameter Name**   |  **Type**  | **Description** |
|-----------------|--------------------|--------|-------------|
| Input Parameter |   Target Entity    | Entity |             |
| Input Parameter | Aggro Owner Entity | Entity |             |

## **5\. Clear the Aggro List of the Specified Entity**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/ae9a22cd-5e44-436d-b8a7-b10134d8a6fe.png)

**Node Functions**

Available only in Custom Aggro Mode

Clears the Aggro List of the specified Entity; this usually causes the Target to leave battle

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**  | **Description** |
|-----------------|----------------|--------|-------------|
| Input Parameter | Target Entity  | Entity |             |

## **6\. Set the Aggro Value of the Specified Entity**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/3c8edbd6-4339-47fa-834f-0d3ffc498537.png)

**Node Functions**

Available only in Custom Aggro Mode

Sets the Aggro Value of the specified Entity on the Aggro Owner Entity

**Node Parameters**

| **Parameter Type**  |   **Parameter Name**   |  **Type**   | **Description** |
|-----------------|--------------------|---------|-------------|
| Input Parameter |   Target Entity    | Entity  |             |
| Input Parameter | Aggro Owner Entity | Entity  |             |
| Input Parameter |    Aggro Value     | Integer |             |

## **7\. Modify the Aggro Value of the Specified Entity**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mhit7ur1q4rq/d94ce6d0-e569-46fa-82d8-247b78723d20.png)

**Node Functions**

Available only in Custom Aggro Mode

Edits the Aggro Value of the specified Entity on the Aggro Owner Entity

**Node Parameters**

| **Parameter Type**  |    **Parameter Name**     |  **Type**   | **Description** |
|-----------------|-----------------------|---------|-------------|
| Input Parameter |     Target Entity     | Entity  |             |
| Input Parameter |  Aggro Owner Entity   | Entity  |             |
| Input Parameter | Aggro Value Increment | Integer |             |

## IV. Signal

1.

**Send Signal to Server Node Graph**

**Node Functions**

Within the skill node graph, signals can be sent to the server node graph, and all server node graphs can listen for this signal.

## **Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**  | **Description** |
|-----------------|----------------|--------|-------------|
| Input Parameter |  Signal Name   | String |             |