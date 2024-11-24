// allocation.js

const allocateFunds = (depositPlans, deposits) => {
    const allocationResult = {};

    // Initialize allocation result for each portfolio
    depositPlans.forEach(plan => {
        for (const [portfolio, amount] of Object.entries(plan.allocations)) {
            if (!allocationResult[portfolio]) {
                allocationResult[portfolio] = 0;
            }
        }
    });

    // Process each deposit
    deposits.forEach(deposit => {
        const totalAllocation = depositPlans.reduce((total, plan) => {
            return total + Object.values(plan.allocations).reduce((a, b) => a + b, 0);
        }, 0);

        if (totalAllocation === 0) {
            throw new Error('No valid allocation found for the deposit.');
        }

        // Allocate funds based on the deposit amount
        depositPlans.forEach(plan => {
            for (const [portfolio, amount] of Object.entries(plan.allocations)) {
                allocationResult[portfolio] += (amount / totalAllocation) * deposit.amount;
            }
        });
    });

    return allocationResult;
};

module.exports = { allocateFunds };