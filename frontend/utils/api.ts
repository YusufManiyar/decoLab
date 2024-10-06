export interface UserResponse {
    email: string;
    name: string;
    profile: {
      websiteUrl: string;
      industry: string[];
      location: string;
      socialLinks: {
        twitterHandle: string;
        telegram?: string;
        github?: string;
      };
      teamMembers: {
        name: string;
        role: string;
        contactEmail: string;
        linkedin?: string;
      }[];
      additionalInfo: {
        logo?: string;
        bio?: string;
      };
    };
  }
  
  export const fetchUserData = async (): Promise<UserResponse> => {
    const response = await fetch('/api/user'); // Adjust the API endpoint as needed
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const data: UserResponse = await response.json();
    return data;
  };