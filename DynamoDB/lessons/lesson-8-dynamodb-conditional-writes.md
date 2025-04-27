# **Mastering Conditional Writes in DynamoDB**

Conditional writes are a powerful feature in **DynamoDB** that allow you to perform **controlled updates**, **deletes**, and **inserts** based on specific conditions.  
Understanding how to use **Condition Expressions** effectively is crucial both for the AWS exam and for real-world applications.

---

# **Conditional Writes Overview**

- **Applies to**:
  - `PutItem`
  - `UpdateItem`
  - `DeleteItem`
  - `BatchWriteItem`
- **Purpose**:  
  - Only **modify data** if a specific **Condition Expression** evaluates to **true**.
- **Comparison**:
  - **Condition Expressions** → Apply to **write operations**.
  - **Filter Expressions** → Apply to **read operations** (queries and scans).

---

# **Common Condition Expressions**

| Condition | Purpose |
|:-----------|:--------|
| `attribute_exists(path)` | Ensure an attribute exists |
| `attribute_not_exists(path)` | Ensure an attribute does **not** exist |
| `attribute_type(path, type)` | Check the type of an attribute |
| `contains(path, operand)` | Check if a string or set contains a value |
| `begins_with(path, substr)` | Check if a string begins with a substring |
| `IN` | Check if a value is among multiple options |
| `BETWEEN` | Check if a value falls between two bounds |
| `size(path)` | Check the size (length) of a string or set |

---

# **Key Use Cases for Conditional Writes**

## **1. Prevent Overwriting Existing Items**

- Use `attribute_not_exists(partition_key)` to **only insert if the item doesn't already exist**.
- Useful for **enforcing uniqueness** when creating new records.

✅ Example:
```sql
ConditionExpression: "attribute_not_exists(user_id)"
```

---

## **2. Control Updates Based on Current Values**

- Update an item **only if** the current attribute values meet certain conditions.

✅ Example (updating price if it's above a limit):
```sql
UpdateItem:
SET price = price - :discount
WHERE price > :limit
```
With values:
```json
{
  ":discount": 150,
  ":limit": 500
}
```

> **Behavior**:  
> - If price = 650 → Update succeeds (650 > 500).  
> - After update, price = 500 → Future update fails (500 is **not** > 500).

---

## **3. Delete Items Conditionally**

- Delete an item **only if**:
  - An attribute **exists** (`attribute_exists`)
  - An attribute **does not exist** (`attribute_not_exists`)
  - Values match certain conditions (e.g., between price ranges).

✅ Examples:
- Delete a product **only if** it has a `OneStar` review:
  ```sql
  ConditionExpression: "attribute_exists(ProductReviews.OneStar)"
  ```
- Delete a product **only if** the price is **between** 500 and 600:
  ```sql
  ConditionExpression: "Price BETWEEN :low AND :high"
  ```

---

## **4. String Condition Checks**

- Use **`begins_with`** and **`contains`** for string validations.

✅ Example:
- Delete images stored with insecure URLs:
  ```sql
  ConditionExpression: "begins_with(imageUrl, 'http://')"
  ```

---

# **Important Concepts to Remember**

| Topic | Details |
|:------|:--------|
| **Condition Expressions** | Used during write operations (PutItem, UpdateItem, DeleteItem, BatchWriteItem) |
| **Filter Expressions** | Used during read operations (Query, Scan) |
| **Fail Behavior** | If the condition fails, the write operation does not happen, and no partial changes occur |
| **Efficient Updates** | Save cost and prevent unintended data overwrites |

---

# **Quick Summary**

- **Use `attribute_not_exists`** to safely insert new records without overwriting.
- **Use conditions on attributes** to update or delete items only when safe.
- **Combine multiple checks** (e.g., category + price range) for complex validation.
- **Leverage string functions** to manage text fields.

✅ **Pro Tip for Exams and Real Projects**:  
Always remember — **Condition Expressions are server-side** in DynamoDB.  
They ensure that **your application logic is enforced at the database level**, not just in your code.

---

# **Coming Up Next**

You now have a strong grasp of Conditional Writes!  
In the next lessons, we'll explore **DynamoDB Indexes (Local and Global Secondary Indexes)** to create **advanced query patterns** and **optimize performance**.