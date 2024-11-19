import { cookies } from "next/headers";

const baseUrl = "http://localhost:8080";

export async function CheckAuthService(cookie: String | null) {
  const url = new URL("/api/CheckAuthByCookie", baseUrl);

  if (cookie == null){
    return null
  }

  try {
    const response = await fetch(url, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookie}`,
      },
      body: JSON.stringify({}),
    });

      const contentType = response.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } 
      
      else if (contentType && contentType.includes("text/plain")) {
        return await response.text();
      } 
      
      else {
        return response;
      }
    
    } catch (error) {
    console.error("Registration Service Error:", error);
    return null;
  }

}