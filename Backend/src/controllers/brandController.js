const Brand = require('../models/brandModel')

// @route POST /api/brand/save
const saveBrand = async (req, res) => {
  const { brandName, industry, colors, logoUrl, tone, brandDescription, targetAudience } = req.body

  try {
    const brand = await Brand.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        brandName,
        industry,
        colors,
        logoUrl,
        tone,
        brandDescription,
        targetAudience,
      },
      { upsert: true, new: true }
    )

    res.status(200).json({ message: 'Brand saved successfully', brand })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// @route GET /api/brand/get
const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({ userId: req.user._id })
    if (!brand) {
      return res.status(404).json({ message: 'No brand found' })
    }
    res.status(200).json({ brand })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// @route PUT /api/brand/update
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndUpdate(
      { userId: req.user._id },
      { ...req.body },
      { new: true }
    )
    res.status(200).json({ message: 'Brand updated successfully', brand })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

module.exports = { saveBrand, getBrand, updateBrand }