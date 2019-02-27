const kue = require("kue");
const redisConfig = require("../../config/redis");
const jobs = require("../jobs");

const Queue = kue.creteQueue({ redis: redisConfig });

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle);

module.exports = Queue;
