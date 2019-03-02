const Ad = require("../models/Ad");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const PurchaseMail = require("../jobs/PurchaseMail");
const Queue = require("../services/Queue");

class PurchaseController {
	async store(req, res) {
		const { ad, content } = req.body;

		const purchaseAd = await Ad.findById(ad).populate("author");
		const user = await User.findById(req.userId);

		const purchase = await Purchase.create({
			content,
			ad,
			user: user._id
		});

		Queue.create(PurchaseMail.key, {
			ad: purchaseAd,
			user,
			content
		}).save();

		return res.json(purchase);
	}

	async update(req, res) {
		const { id } = req.params;

		const { ad } = await Purchase.findById(id).populate({
			path: "ad",
			populate: {
				path: "author"
			}
		});

		if (ad.purchasedBy) {
			return res.status(400).json({ error: "Ad already purchased" });
		}

		ad.purchasedBy = id;

		await ad.save();

		return res.json(ad);
	}
}

module.exports = new PurchaseController();
