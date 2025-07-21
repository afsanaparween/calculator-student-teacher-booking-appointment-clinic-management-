function logActivity(message) {
  const logEntry = {
    message: message,
    timestamp: new Date().toISOString(),
  };

  console.log(logEntry);
}

export { logActivity };