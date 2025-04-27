Great!  
You just shared the full **transcript** of a lesson about **DynamoDB Capacity Modes** — which covers a lot of material. 📚  
Let’s **summarize and organize** everything cleanly for you:

---

# 🚀 DynamoDB Capacity Modes – Full Structured Summary

---

## 1. Two Capacity Modes
| Mode | What Happens | Cost | When to Use |
|:----|:----|:----|:----|
| **Provisioned Mode** | You manually define Read (RCU) and Write (WCU) capacity units. | Cheaper if workload is predictable. | Stable, predictable workloads. |
| **On-Demand Mode** | DynamoDB automatically scales read/write based on demand. | 2.5x more expensive. | Unpredictable, spiky workloads. |

🛠 You can **switch modes once every 24 hours**.

---

## 2. Provisioned Mode Details
- **RCU** = Read Capacity Unit  
- **WCU** = Write Capacity Unit  
- You can set **Auto-Scaling** to automatically adjust provisioned capacity.

If you exceed your RCU/WCU:
- DynamoDB first tries **burst capacity**.
- If exhausted → You get `ProvisionedThroughputExceededException`.
- You should **retry with exponential backoff**.

---

## 3. Write Capacity Unit (WCU) – How It Works
- 1 **WCU** = **1 write per second** of an item **up to 1KB**.
- If item > 1KB → **Round up** (example: 2.1KB = 3 WCU).
  
### 🧮 Examples:
- **10 items/sec**, each 2KB → `10 × 2 = 20 WCUs`.
- **6 items/sec**, each 4.5KB → `6 × 5 = 30 WCUs` (round up 4.5KB to 5KB).
- **120 items/minute**, 2KB each → 
  - 120 ÷ 60 = 2 items/sec → 2 × 2 = **4 WCUs**.

---

## 4. Read Capacity Unit (RCU) – How It Works
- 1 **RCU** = 
  - 1 strongly consistent read/sec of item up to **4KB**, OR
  - 2 eventually consistent reads/sec of item up to **4KB**.

### 🧮 Examples:
- **10 strongly consistent reads/sec**, 4KB → 10 RCUs.
- **16 eventually consistent reads/sec**, 12KB → 
  - 16 ÷ 2 = 8 (because 1 RCU = 2 eventually consistent reads)
  - 12KB ÷ 4 = 3 (rounded up)
  - 8 × 3 = **24 RCUs**.
- **10 strongly consistent reads/sec**, 6KB → 
  - 6KB rounds to 8KB.
  - 8KB ÷ 4 = 2
  - 10 × 2 = **20 RCUs**.

---

## 5. Consistency Modes
| Mode | Behavior | Cost |
|:----|:----|:----|
| **Eventually Consistent** (default) | Read may see stale data for milliseconds. | 2x cheaper. |
| **Strongly Consistent** | Always gets latest write. | More expensive (2x RCU needed). |

You set **`ConsistentRead: true`** if you want strongly consistent reads.

---

## 6. Partitions Behind the Scenes
- **DynamoDB Tables** are **split into partitions**.
- **Partition Key** → Hashed → Assigned to a partition.
- RCUs/WCUs are **evenly distributed** across partitions.

⚡ Problem:  
If one partition is "hot" (many reads/writes), it may throttle → `ProvisionedThroughputExceededException`.

✅ Solutions:
- Use **good partition keys** (distribute the load).
- Use **DAX** (DynamoDB Accelerator) to cache reads.
- Retry with **exponential backoff**.

---

## 7. On-Demand Mode Details
- No need to specify RCUs/WCUs.
- Pay **per request** (read request units - RRUs, write request units - WRUs).
- Costs ~**2.5x more** than provisioned.
- Best for:
  - Unknown workload
  - Very spiky or unpredictable traffic

---

# 🎯 Quick Mind Map
```
DynamoDB
├── Provisioned
│    ├── Set RCUs / WCUs
│    ├── Auto-scaling option
│    ├── Burst capacity then throttling
│    └── Exponential backoff on error
├── On-Demand
│    ├── Auto scaling reads/writes
│    └── Pay-per-request
└── Consistency
     ├── Eventually Consistent (cheap)
     └── Strongly Consistent (expensive)
```

---

# 🧠 Final Exam Tips
- Provisioned = plan capacity, cheaper, throttling possible.
- On-demand = auto scale, no throttling, but expensive.
- 1 WCU = 1 write/sec for 1KB.
- 1 RCU = 1 read/sec for 4KB (strong), or 2 reads/sec (eventual).
- Always **round item size up**.
- Throttling handled with **exponential backoff**.
- Partitions spread RCUs/WCUs evenly.

---

Would you also like me to prepare a **cheat sheet table** you can **download** if you're studying for AWS exams? 🎯📚  
(I can make it super clean and printable if you want!)