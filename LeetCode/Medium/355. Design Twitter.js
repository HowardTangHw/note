/**
 * Initialize your data structure here.
 */
var Twitter = function() {
    this.userFollowMap = {};
    this.articleMap = {};
    this.articleTime = [];
    this.articleCount = 0;
};

/**
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    let articleList = this.articleMap[userId] || [];
    articleList.push(tweetId);
    this.articleMap[userId] = articleList;
    this.articleTime[tweetId] = this.articleCount;
    this.articleCount++;
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    let newsFeed = [];
    let articleTime = this.articleTime;
    let followList = this.userFollowMap[userId] || [];
    followList.push(userId);
    followList.map(uid => {
        let followNewsFeed = this.articleMap[uid] || [];
        newsFeed = newsFeed.concat(followNewsFeed);
    });

    return Array.from(new Set(newsFeed))
        .sort((a, b) => {
            let aTime = articleTime[a];
            let bTime = articleTime[b];
            return bTime - aTime;
        })
        .slice(0, 10);
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    let followList = this.userFollowMap[followerId] || [];
    followList.push(followeeId);
    this.userFollowMap[followerId] = followList;
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    let followList = this.userFollowMap[followerId] || [];
    let idx = followList.findIndex(id => id === followeeId);
    if (idx !== -1) {
        followList.splice(idx, 1);
    }
    this.userFollowMap[followerId] = followList;
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
