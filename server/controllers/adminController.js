const jwt = require("jsonwebtoken");
const Certification = require("../models/Certification");

exports.login = async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.json({ success: true, message: "Logged out" });
};

exports.getStatus = (req, res) => {
  res.json({ success: true, message: "Authenticated" });
};

exports.getCertifications = async (req, res) => {
  try {
    const certs = await Certification.find().sort({ date: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCertification = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert)
      return res
        .status(404)
        .json({ success: false, message: "Cert not found" });
    res.json({ success: true, message: "Certification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
