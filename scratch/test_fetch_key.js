async function testFetch() {
  const url = "https://cshelper.kr/c8a7bf8d43a55e8057aafd6f7928d34e.txt";
  console.log("Fetching live key URL:", url);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("HTTP Status:", res.status);
    console.log("Key File Content:", text.trim());
  } catch (e) {
    console.error("Error:", e.message);
  }
}
testFetch();
