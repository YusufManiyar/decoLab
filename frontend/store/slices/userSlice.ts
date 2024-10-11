import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  email: string;
  name: string;
  profile: {
    websiteUrl: string;
    industry: string[];
    location: string;
    socialLinks: {
        twitterHandle: string;
        telegram: string;
        github: string;
    },
    teamMembers: TeamMember[] | [];
    additionalInfo: {
        logo: string;
        bio: string;
    }
  }
}

export interface TeamMember {
    name: string;
    avatar: string;
    role: string;
    contactEmail: string;
    linkedin: string;
}

interface UserState {
  userData: User | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null;
    },
    updateLogo(state, action: PayloadAction<string>) {
      if(state.userData) {
        state.userData.profile.additionalInfo.logo = action.payload;
      }
    },
    pushTeamMember(state, action: PayloadAction<TeamMember>) {
      if(state.userData) {
        state.userData.profile.teamMembers = [
          ...state.userData.profile.teamMembers,
          action.payload
        ];
      }
    }
  },
});

export const { setUser, clearUser, updateLogo, pushTeamMember } = userSlice.actions;
export default userSlice.reducer;