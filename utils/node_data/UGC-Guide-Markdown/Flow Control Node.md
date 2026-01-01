# Flow Control Node

## **1\. Multiple Branches**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mh0kvz9d42e2/f737a2e0-028a-4724-9b39-077959f1e1a4.png)

**Node Functions**

Accepts one input parameter as the control expression (supports Integer or String). Branches into multiple paths based on its value

When the value on an Output Pin equals the control expression, execution continues along that Output Pin. If no pin matches, the \[Default\] pin is taken

**Node Parameters**

| **Parameter Type**  |   **Parameter Name**   |  **Type**   |            **Description**            |
|-----------------|--------------------|---------|-----------------------------------|
| Input Parameter | Control Expression | Generic | Only supports Integers or Strings |

## **2\. Double Branch**

![](https://act-webstatic.mihoyo.com/ugc-tutorial/knowledge/cn/en-us/mh0kvz9d42e2/f3debfdb-74c0-49d7-b08d-7168a73fa9f3.png)

**Node Functions**

Branches into True or False based on the evaluated condition

When the Boolean is True, the \[True\] execution flow runs; when it is False, the \[False\] execution flow runs

**Node Parameters**

| **Parameter Type**  | **Parameter Name** |  **Type**   | **Description** |
|-----------------|----------------|---------|-------------|
| Input Parameter |   Condition    | Boolean |             |