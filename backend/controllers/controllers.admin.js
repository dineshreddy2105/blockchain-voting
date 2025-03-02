const bcrypt = require("bcrypt");
const Admin = require("../models/models.admin");
const { createSecretToken } = require("../services/JWTService")

const loginAdmin = async (req, res) => {
  console.log(Admin);
  const { email, password } = req.body;
  console.log("Admin Login Request:", { email, password });

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Ensure the password field exists
    if (!admin.password) {
      return res
        .status(500)
        .json({ message: "Server error: Password missing" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    data = {
      email: admin.email,
      name: admin.name,
      role: "admin"
    }

    const token = createSecretToken(data);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { loginAdmin };
