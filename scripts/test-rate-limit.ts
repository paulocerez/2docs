async function testRateLimit(userId: string) {
  const makeRequest = async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/test/rate-limit`
    );
    const data = await response.json();
    console.log(`Status: ${response.status}`, data);
    return response.ok;
  };

  // Make 12 requests to test the rate limit
  for (let i = 0; i < 12; i++) {
    console.log(`Request ${i + 1}:`);
    await makeRequest();
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
  }
}

// Use a test user ID when running the script
testRateLimit('test-user-123'); 