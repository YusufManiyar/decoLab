const parseExpirationDate = (expirationDate: string) => {
    const match = expirationDate.match(/(\d+)\s*(day|week|month)s?/i);
    if (!match) {
        throw new Error("Invalid expiration date format");
    }
    
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    
    switch (unit) {
        case 'day':
            return value * 24 * 60 * 60 * 1000;
        case 'week':
            return value * 7 * 24 * 60 * 60 * 1000;
        case 'month':
            return value * 30 * 24 * 60 * 60 * 1000;
        default:
            throw new Error("Invalid time unit");
    }
}

export const isIntendExpiredPost = (createdAt: string, expirationDate: string, timeUnit: string): boolean => {
    const createdDate = new Date(createdAt);
    const expirationTime = parseExpirationDate(`${expirationDate} ${timeUnit}`);
    const expiredDate = new Date(createdDate.getTime() + expirationTime);
    const currentDate = new Date();
    const timeDifference = expiredDate.getTime() - currentDate.getTime();
    const daysUntilExpiration = timeDifference / (1000 * 60 * 60 * 24);
    return daysUntilExpiration <= 1 && daysUntilExpiration > 0;
}

export const calFollowersWithUnit = (followers: number): string => {
    return `${followers >= 1000 ? `${followers/1000} K` : followers}`;
}