import artesian from "../models/artesian";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await artesian.find();
		return res.status(200).json(result);
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const result = await artesian.create(req.body);
		return res.status(200).json(result);
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
			err,
		});
	}
});

router.post("/search/nearby", async (req: Request, res: Response) => {
	try {
		const { latitude, longitude } = req.body;
		const searching = await artesian.find({
			location: {
				$near: {
					$geometry: {
						type: "Point",
						coordinates: [latitude, longitude],
					},
					$maxDistance: 5000,
				},
			},
		});
		return res.status(200).json(searching);
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
			err,
		});
	}
});

export default router;
