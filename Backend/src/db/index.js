import mongoose from "mongoose";

const DB_NAME = "helphive";

const seedAdminUser = async () => {
  try {
    const { User } = await import("../models/user.model.js");
    const { UserRolesEnum } = await import("../constants.js");

    const adminEmail = "pathakkaushik2004@gmail.com";
    const adminPass = "Kaushik@@79";

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      await User.create({
        fullName: "Kaushik Pathak",
        email: adminEmail,
        password: adminPass,
        phone: "9999999999",
        role: UserRolesEnum.ADMIN,
        address: { street: "Main Office", city: "Delhi", state: "Delhi", zipCode: "110001" }
      });
      console.log("✅ Admin user auto-seeded successfully!");
    } else if (admin.role !== UserRolesEnum.ADMIN) {
      admin.role = UserRolesEnum.ADMIN;
      await admin.save({ validateBeforeSave: false });
      console.log("✅ Admin role updated for existing user!");
    }
  } catch (err) {
    console.log("Admin seed status:", err.message);
  }
};

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    await seedAdminUser();
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;