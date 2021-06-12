export const runWithProbability = (fn: () => void, probability: number) => {
    const shouldRun = Math.random() < probability;

    shouldRun && fn();
};
