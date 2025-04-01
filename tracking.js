(document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("location-popup-container");
  // const apiUrl = "https://counterbynipun.onrender.com/api/track";
  const apiUrl = "http://localhost:3000/api/track";
  const token = getQueryParam("token");

  // Function to retrieve query parameter from script URL
  function getQueryParam(param) {
    const script = document.currentScript;
    const url = new URL(script.src);
    return url.searchParams.get(param);
  }

  // Function to hash data (IP in this case) using SHA-256
  async function hashIP(ip) {
    const encoder = new TextEncoder();
    const data = encoder.encode(ip);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function getOSAndDevice() {
    const userAgent = navigator.userAgent;
    let os = "Unknown OS";
    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    else if (userAgent.indexOf("Mac") !== -1) os = "macOS";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

    let device = "Desktop";
    if (/Mobile|Android|iPhone|iPad|iPod/.test(userAgent)) device = "Mobile";

    return { os, device };
  }

  // Function to get the user's IP
  async function getUserIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      if (!response.ok) throw new Error(`Failed to fetch IP: ${response.status}`);
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return null;
    }
  }

  // Function to get user's IP and location (only if consented)
  async function getUserIPAndLocation() {
    try {
      const response = await fetch("https://ipinfo.io/json?token=4fe0c05bf130d0");
      if (!response.ok) throw new Error(`Failed to fetch location: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  }

  // Function to send tracking data
  async function sendTrackingData(collectLocation) {
    try {
      const ip = await getUserIP();
      if (!ip) return;

      const hashedIP = await hashIP(ip);
      const userAgentInfo = getOSAndDevice();
      let requestData = {
        ipAddress: hashedIP,
        os: userAgentInfo.os,
        device: userAgentInfo.device,
      };

      if (collectLocation) {
        const locationData = await getUserIPAndLocation();
        if (locationData) {
          requestData.city = locationData.city;
          requestData.country = locationData.country;
        }
      }

      await fetch(`${apiUrl}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  }

  // Show popup if no prior consent
  if (!localStorage.getItem("locationConsent")) {
    const popup = document.createElement("div");
    popup.id = "location-popup";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "#333";
    popup.style.color = "white";
    popup.style.padding = "15px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
    popup.style.display = "flex";
    popup.style.alignItems = "center";
    popup.style.justifyContent = "space-between";
    popup.style.minWidth = "300px";

    popup.innerHTML = `
        <span>Allow location tracking for analytics?</span>
        <button id="accept-btn" style="margin-left:10px;padding:8px 12px;border:none;cursor:pointer;border-radius:3px;background:green;color:white;">Accept</button>
        <button id="decline-btn" style="margin-left:10px;padding:8px 12px;border:none;cursor:pointer;border-radius:3px;background:red;color:white;">Decline</button>
    `;

    container.appendChild(popup);

    document.getElementById("accept-btn").addEventListener("click", function () {
      localStorage.setItem("locationConsent", "accepted");
      popup.remove();
      sendTrackingData(true); // Collect location data
    });

    document.getElementById("decline-btn").addEventListener("click", function () {
      localStorage.setItem("locationConsent", "declined");
      popup.remove();
      sendTrackingData(false); // Only collect hashed IP
    });
  } else {
    // Use stored consent value
    sendTrackingData(localStorage.getItem("locationConsent") === "accepted");
  }
}))();