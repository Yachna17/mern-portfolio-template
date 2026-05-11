const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  issuer: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  credentialUrl: {
    type: String,
    trim: true,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Certification', certificationSchema)