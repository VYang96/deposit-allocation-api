const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 存款计划管理类
class DepositPlanManager {
    constructor() {
        this.depositPlans = [];
        this.deposits = [];
    }

    addDepositPlan(plan) {
        this.depositPlans.push(plan);
    }

    addDeposits(depositsList) {
        this.deposits = depositsList;
    }

    getAllUsers() {
        const users = new Set();
        this.deposits.forEach(deposit => {
            users.add(deposit.user);
        });
        return Array.from(users);
    }

    allocateFunds() {
        const allocationResult = {};
        let totalOneTimeAllocation = 0;
        let totalMonthlyAllocation = 0;
    
        // Calculate total allocation amounts for each plan type
        this.depositPlans.forEach(plan => {
            plan.allocations.forEach(allocation => {
                const { portfolio, amount } = allocation;
                const { id, name, type, description, riskLevel } = portfolio;
    
                if (!allocationResult[name]) {
                    allocationResult[name] = {
                        id,
                        type,
                        description,
                        riskLevel,
                        allocatedAmount: 0
                    };
                }
    
                // Sum the total allocation amounts based on plan type
                if (plan.type === "one-time") {
                    totalOneTimeAllocation += amount;
                } else if (plan.type === "monthly") {
                    totalMonthlyAllocation += amount;
                }
            });
        });
    
        // Process each deposit
        this.deposits.forEach(deposit => {
            const depositAmount = deposit.amount;
    
            // Allocate for one-time deposits
            if (deposit.type === "one-time") {
                this.depositPlans.forEach(plan => {
                    if (plan.type === "one-time") {
                        plan.allocations.forEach(allocation => {
                            const { portfolio, amount } = allocation;
                            const { name } = portfolio;
    
                            if (allocationResult[name]) {
                                // Calculate allocated amount
                                allocationResult[name].allocatedAmount += (amount / totalOneTimeAllocation) * depositAmount;
                            }
                        });
                    }
                });
            }
    
            // Allocate for monthly deposits
            if (deposit.type === "monthly") {
                this.depositPlans.forEach(plan => {
                    if (plan.type === "monthly") {
                        plan.allocations.forEach(allocation => {
                            const { portfolio, amount } = allocation;
                            const { name } = portfolio;
    
                            if (allocationResult[name]) {
                                // Calculate allocated amount
                                allocationResult[name].allocatedAmount += (amount / totalMonthlyAllocation) * depositAmount;
                            }
                        });
                    }
                });
            }
        });
    
        // Ensure all funds are allocated
        const totalAllocated = Object.values(allocationResult).reduce((sum, value) => sum + value.allocatedAmount, 0);
        const totalDeposits = this.deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
    
        if (totalAllocated < totalDeposits) {
            throw new Error("Not all funds have been allocated. Please check your deposit plans and amounts.");
        }
    
        return allocationResult;
    }

}

// 实例化存款计划管理器
const depositPlanManager = new DepositPlanManager();

// 创建存款计划的接口
app.post('/api/deposit-plans', (req, res) => {
    const { type, allocations } = req.body;

    if (!type || !allocations || !Array.isArray(allocations)) {
        return res.status(400).json({ error: 'Type and allocations are required and allocations must be an array.' });
    }

    const plan = { type, allocations };
    depositPlanManager.addDepositPlan(plan);
    res.status(201).json({ message: 'Deposit plan created', plan });
});

// 创建新的存款记录
app.post('/api/deposits', (req, res) => {
    const { depositsList, user } = req.body; // 添加 user 参数

    if (!depositsList || !Array.isArray(depositsList)) {
        return res.status(400).json({ error: 'Deposits list is required and must be an array.' });
    }

    if (!user) {
        return res.status(400).json({ error: 'User  is required.' });
    }

    const depositsWithReference = depositsList.map(deposit => ({
        amount: deposit.amount,
        type: deposit.type,
        user, // 将用户信息添加到存款对象中
        reference: `REF${Math.floor(Math.random() * 1000000)}` // 生成随机的 reference
    }));

    depositPlanManager.addDeposits(depositsWithReference);
    res.status(201).json({ message: 'Deposits added successfully', deposits: depositsWithReference });
});

// 查看存款计划的接口
app.get('/api/deposit-plans', (req, res) => {
    res.json({ depositPlans: depositPlanManager.depositPlans });
});

// 查看所有存款记录的接口
app.get('/api/deposits', (req, res) => {
    // 获取所有存款记录
    const allDeposits = depositPlanManager.deposits;

    if (allDeposits.length === 0) {
        return res.status(404).json({ message: 'No deposits found.' });
    }

    res.status(200).json({ deposits: allDeposits });
});

app.post('/api/allocate-funds', (req, res) => {
    try {
        const users = depositPlanManager.getAllUsers();

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found.' });
        }

        const allocationResults = [];

        users.forEach(user => {
            const deposits = depositPlanManager.deposits.filter(deposit => deposit.user === user);

            if (!deposits || deposits.length === 0) {
                allocationResults.push({
                    user: user,
                    message: 'No deposits found for the user.',
                    allocationResult: {}
                });
                return;
            }

            // 资金分配逻辑
            const allocationResult = depositPlanManager.allocateFunds(deposits);

            // 这里假设 allocateFunds 返回了我们需要的分配结果
            allocationResults.push({
                user: user,
                message: 'Funds allocated successfully',
                allocationResult: allocationResult
            });
        });

        res.status(200).json(allocationResults);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 分配资金的接口
// app.post('/api/allocate-funds', (req, res) => {
//     try {
//         // 获取所有用户
//         const users = userManager.getAllUsers(); // 假设有一个方法可以获取所有用户

//         if (!users || users.length === 0) {
//             return res.status(404).json({ error: 'No users found.' });
//         }

//         // 初始化响应结果
//         const allocationResults = [];

//         // 为每个用户计算资金分配
//         users.forEach(user => {
//             const deposits = depositPlanManager.getDepositsByUser (user.id); // 获取用户的存款记录

//             if (!deposits || deposits.length === 0) {
//                 allocationResults.push({
//                     user: user.id,
//                     message: 'No deposits found for the user.',
//                     allocationResult: {}
//                 });
//                 return;
//             }

//             // 资金分配逻辑
//             const allocationResult = depositPlanManager.allocateFunds(deposits); // 根据存款记录分配资金

//             // 构建用户的分配结果
//             allocationResults.push({
//                 user: user.id,
//                 message: 'Funds allocated successfully',
//                 allocationResult: {
//                     "High risk": {
//                         "id": 1,
//                         "type": "equity",
//                         "description": "High risk portfolio",
//                         "riskLevel": "high",
//                         "allocatedAmount": allocationResult.highRiskAllocatedAmount // 使用实际分配的金额
//                     },
//                     "Retirement": {
//                         "id": 2,
//                         "type": "bonds",
//                         "description": "Retirement portfolio",
//                         "riskLevel": "low",
//                         "allocatedAmount": allocationResult.retirementAllocatedAmount // 使用实际分配的金额
//                     }
//                 }
//             });
//         });

//         // 返回所有用户的分配结果
//         res.status(200).json(allocationResults);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});