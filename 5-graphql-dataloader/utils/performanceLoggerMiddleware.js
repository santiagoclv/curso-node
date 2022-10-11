const performanceLoggerMiddleware = async (fn, message) => {
    const t0 = performance.now();
    const something = await fn();
    const t1 = performance.now();
    console.log(`${message} took: ${Math.trunc(t1 - t0)}ms -`);
    return something;
}

module.exports = performanceLoggerMiddleware