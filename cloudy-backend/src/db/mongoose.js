import mongoose from "mongoose";

export default mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log(`Connected To Database`))
	.catch((err) => console.log(`Error: ${err}`));
