const { Resend } = require("resend");
const Message = require("../models/Message");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.send = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Message.create({ name, email, message });

    await resend.emails.send({
      // CUSTOMIZE: The from address.
      // Until you verify a domain with Resend, keep 'onboarding@resend.dev'
      // — it's Resend's default sandbox sender and works out of the box.
      // Once you verify your own domain at resend.com/domains, change to:
      // 'portfolio@YOUR_DOMAIN' or 'noreply@YOUR_DOMAIN'
      from: "onboarding@resend.dev",

      // CUSTOMIZE: Where contact form submissions get delivered.
      // Replace with your own email address.
      to: "YOUR_EMAIL_ADDRESS",

      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
