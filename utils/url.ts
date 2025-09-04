/**
 * Generates a human-readable name from a URL.
 * e.g., 'https://news.google.com' becomes 'Google News'
 * e.g., 'https://microsoft.com' becomes 'Microsoft'
 */
export const generateNameFromUrl = (url: string): string => {
  try {
    const fullUrl = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
    const urlObject = new URL(fullUrl);
    
    // Remove 'www.' prefix
    let cleanHostname = urlObject.hostname.replace(/^www\./, '');
    const hostParts = cleanHostname.split('.');
    
    let mainParts: string[];
    
    // Heuristic to handle TLDs like .com, .org, and .co.uk
    if (hostParts.length > 2 && hostParts[hostParts.length - 2].length <= 3) {
      // Handles cases like 'bbc.co.uk', taking parts before '.co.uk'
      mainParts = hostParts.slice(0, -2);
    } else {
      // Handles 'google.com' or 'news.google.com'
      mainParts = hostParts.slice(0, -1);
    }

    // Fallback for cases like 'localhost' or single-word domains
    if (mainParts.length === 0 && hostParts.length > 0) {
      mainParts = [hostParts[0]];
    }

    // Capitalize each part, reverse for better readability (subdomain last), and join.
    return mainParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .reverse()
      .join(' ');
  } catch (error) {
    console.error("Failed to generate name from URL:", url, error);
    // Basic fallback for invalid URLs
    return url.trim();
  }
};
