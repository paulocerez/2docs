async function testRateLimit() {
  const makeRequest = async () => {
    const res = await fetch('http://localhost:3000/api/test-rate-limit', {
      headers: {
        'x-test-mode': 'true'
      }
    })
    return res.json()
  }

  console.log('Starting rate limit test...')
  
  for (let i = 1; i <= 12; i++) {
    try {
      const result = await makeRequest()
      console.log(`Request ${i}:`, result)
    } catch (error) {
      console.error(`Request ${i} failed:`, error)
    }
    // Add small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

testRateLimit() 