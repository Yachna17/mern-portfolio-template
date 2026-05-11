const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const projectController = require("../controllers/projectController");
const adminController = require("../controllers/adminController");
const certificationController = require("../controllers/certificationController");
const verifyToken = require("../middleware/verifyToken");
const { loginLimiter } = require("../middleware/rateLimiter");

const fs = require("fs");
const path = require("path");

router.get("/currently", verifyToken, (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/currently.json");
    if (!fs.existsSync(filePath)) return res.json({ success: true, data: "" });
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json({ success: true, data: data.currently || "" });
  } catch {
    res.json({ success: true, data: "" });
  }
});

router.post("/currently", verifyToken, (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/currently.json");
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      filePath,
      JSON.stringify({ currently: req.body.currently }),
    );
    res.json({ success: true, message: "Saved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", loginLimiter, adminController.login);
router.post("/logout", adminController.logout);
router.get("/status", verifyToken, adminController.getStatus);

router.post("/skills", verifyToken, skillController.create);
router.put("/skills/:id", verifyToken, skillController.update);
router.delete("/skills/:id", verifyToken, skillController.remove);

router.post("/projects", verifyToken, projectController.create);
router.put("/projects/:id", verifyToken, projectController.update);
router.delete("/projects/:id", verifyToken, projectController.remove);

router.get("/certifications", verifyToken, certificationController.getAll);
router.post("/certifications", verifyToken, certificationController.create);
router.delete(
  "/certifications/:id",
  verifyToken,
  certificationController.remove,
);

// Test route commented out for now
// router.get('/test', (req, res) => {
//   res.json({ message: 'Admin route is working' })
// })

module.exports = router;
