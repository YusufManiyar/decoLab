const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
});

async function verifyTwitterHandle(twitterHandle) {
    try {
        const user = await twitterClient.v2.userByUsername(twitterHandle);
        return user;
    } catch (error) {
        console.error('Error verifying Twitter handle:', error);
        return null;
    }
}

async function getUserDetails(userId) {
    try {
        const user = await twitterClient.v2.user(userId);
        return user;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}

module.exports = {
    verifyTwitterHandle,
    getUserDetails,
};
