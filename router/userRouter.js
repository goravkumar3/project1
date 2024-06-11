const express = require("express");
const userModel = require("../Sechena/userModel");
const userValidate = require("../validate/userValidate");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const secret = "blogbuddy";
const router = express();
const bycrpt = require("bcryptjs");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kg558390@gmail.com",
    pass: "slhvmfyplbcoswxg",
  },
});

router.post("/signup", async (req, res) => {
  try {
    await userValidate.validateAsync(req.body);
    const { fullname, email, password } = req.body;
    const emailchecki = await userModel.findOne({ email });
    if (emailchecki) {
      res.json({ msg: "this email already used" });
    } else {
      const otpnum = Math.floor(100000 + Math.random() * 900000);
      const user = await userModel.create({
        fullname,
        email,
        password,
        otpnum,
      });
      const userId = user._id;
      const token = jwt.sign({ userId }, secret);
      const mailOptions = {
        from: "kg558390@gmail.com", // sender address
        to: email, // list of receivers
        subject: "verify your account", // Subject line
        html: `this is your otp:${otpnum}`, // plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else res.status(200).json({ token, info, msg: "signup successfully" });
      });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.patch("/verify", async (req, res) => {
  try {
    const { otpnum } = req.body;
    const user = await userModel.updateOne(
      { otpnum },
      { $set: { isVerify: true } }
    );
    res.status(200).json({ msg: "verified", user });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const validatePass = bycrpt.compareSync(password, user.password);
      if (validatePass) {
        const userId = user._id;
        const token = jwt.sign({ userId }, secret);
        res.status(200).json({ msg: "signin successfully" ,token,emailVerify:user.isVerify});
      }
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    const emailchecki = await userModel.findOne({ email });
    if (emailchecki) {
      const mailOptions = {
        from: "kg558390@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Change your password", // Subject line
        html: `click here <a href="http://localhost:5173/UpdatePass/${emailchecki._id}">change</a>`, // plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else res.status(200).json({ info });
      });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
router.patch("/updatePass", async (req, res) => {
  try {
    const {userId,password } = req.body;
    const salt=await bycrpt.genSaltSync(12);
    const hashPass=await bycrpt.hashSync(password,salt)
    const user = await userModel.updateOne(
      { _id:userId },
      { $set: { password: hashPass} }
    );
    res.status(200).json({ msg: "updatePass"});
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
