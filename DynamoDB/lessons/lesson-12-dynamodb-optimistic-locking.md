# **Optimistic Locking in DynamoDB**

**Optimistic Locking** is a crucial feature in **Amazon DynamoDB** that ensures **Conditional Writes**. It is designed to prevent conflicts when multiple clients attempt to update or delete the same item simultaneously.

---

## **What is Optimistic Locking?**

Optimistic Locking ensures that a **write or delete operation** is only performed if a specific **condition** is met — specifically, that the item **has not changed** since it was last read.

- **Key Idea:**  
  Updates or deletes happen **only if** the item’s version matches the expected value.
  
- **Purpose:**  
  Prevents overwriting changes made by other clients, avoiding **data inconsistency**.

---

## **How It Works**

1. **Version Attribute:**  
   Each item includes a **version number** attribute.

2. **Conditional Check:**  
   Before updating or deleting, DynamoDB checks if the item's version matches the expected version.

3. **Update on Success:**  
   - If the versions match, the operation proceeds.
   - The version number is **incremented** after a successful update.

4. **Error on Mismatch:**  
   - If the versions do not match, DynamoDB **rejects** the operation.
   - The client receives an **error message**, indicating the item has changed and suggesting a **re-read** before retrying.

---

## **Example Scenario**

| **Step** | **Action** | **Result** |
|:---|:---|:---|
| Initial Item | `user_id: 123`, `first_name: Original`, `version: 1` | |
| Client 1 | Attempts to update `first_name = John` **if** `version = 1` | |
| Client 2 | Attempts to update `first_name = Lisa` **if** `version = 1` | |
| Update Outcome | - Client 2's update succeeds: `first_name = Lisa`, `version = 2`<br>- Client 1's update fails: version mismatch error |

---

## **Important Notes**

- **Client Error Handling:**  
  Clients must be prepared to handle version mismatch errors by:
  - Re-fetching the latest item.
  - Attempting the update again with the new version.

- **Exam Tip:**  
  Understanding **Optimistic Locking** and **Conditional Writes** is important for AWS certification exams related to DynamoDB!

---

## **Summary**

**Optimistic Locking** is a lightweight and efficient way to handle concurrent updates in DynamoDB without introducing heavy locking mechanisms. By using a **version attribute** and **Conditional Writes**, you can maintain **data consistency** even under high-concurrency scenarios.