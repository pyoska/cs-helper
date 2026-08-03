async function checkLiveAdsTxt() {
  const url = "https://cshelper.kr/ads.txt";
  console.log("Checking live ads.txt at:", url);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("HTTP Status:", res.status);
    console.log("Response Content:\n", text.trim());
    if (res.status === 200 && text.includes("pub-8564419444772490")) {
      console.log("\n🟢 [LIVE CONFIRMED] public/ads.txt is 100% active on production!");
    } else {
      console.log("\n🟡 [BUILD IN PROGRESS] Waiting for Vercel build to complete (~30-60 secs).");
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}
checkLiveAdsTxt();
