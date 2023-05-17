import mongoose, { Schema } from "mongoose";

const mySchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},

		category: {
			type: String,
		},

		location: {
			type: {
				type: String,
				enum: ["Point"],
				default: "Point",
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
	},
	{ timestamps: true },
);

mySchema.index({ location: "2dsphere" });

export default mongoose.model("artesians", mySchema);
