const gemini = require('../config/gemini')
const Content = require('../models/contentModel')
const Brand = require('../models/brandModel')

// @route POST /api/ai/generate-caption
const generateCaption = async (req, res) => {
  const {
    topic,
    platform,
    tone,
    language = 'English',
  } = req.body

  try {
    // Get brand data for consistency
    const brand = await Brand.findOne({
      userId: req.user._id,
    })

    const brandContext = brand
      ? `Brand name: ${brand.brandName}.
Industry: ${brand.industry}.
Target audience: ${brand.targetAudience}.
Brand description: ${brand.brandDescription}.`
      : ''

    const platformRules = {
      linkedin:
        'Professional tone, max 3000 characters, 3-5 hashtags, include a call to action.',

      instagram:
        'Engaging and visual, max 2200 characters, 10-15 hashtags, use emojis.',

      facebook:
        'Conversational, max 500 characters, 3-5 hashtags, encourage interaction.',

      twitter:
        'Concise, max 280 characters, 2-3 hashtags, punchy and direct.',
    }

    const prompt = `
You are a professional social media content creator.

Generate a ${tone} social media caption for ${platform} about:
"${topic}"

${brandContext}

Platform rules:
${platformRules[platform] || platformRules.instagram}

Language:
${language}

Return ONLY a valid JSON object in this exact format:

{
  "caption": "your caption here",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3"],
  "engagementScore": 85
}
`

    const response = await gemini.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 1000,
        responseMimeType: 'application/json',
      },
    })

    const raw = response.text.trim()
    const parsed = JSON.parse(raw)

    // Save to MongoDB
    const saved = await Content.create({
      userId: req.user._id,
      platform,
      topic,
      tone,
      caption: parsed.caption,
      hashtags: parsed.hashtags,
      engagementScore: parsed.engagementScore,
    })

    res.status(200).json({
      message: 'Caption generated successfully',

      content: {
        id: saved._id,
        caption: parsed.caption,
        hashtags: parsed.hashtags,
        engagementScore: parsed.engagementScore,
      },
    })
  } catch (err) {
    console.error('Caption generation error:', err.message)

    res.status(500).json({
      message: 'Failed to generate caption',
      error: err.message,
    })
  }
}

// @route POST /api/ai/generate-hashtags
const generateHashtags = async (req, res) => {
  const {
    topic,
    platform,
    count = 10,
  } = req.body

  try {
    const prompt = `
Generate ${count} trending and relevant hashtags
for a ${platform} post about:

"${topic}"

Return ONLY a valid JSON object in this exact format:

{
  "hashtags": [
    "hashtag1",
    "hashtag2",
    "hashtag3"
  ]
}
`

    const response = await gemini.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 300,
        responseMimeType: 'application/json',
      },
    })

    const raw = response.text.trim()
    const parsed = JSON.parse(raw)

    res.status(200).json({
      message: 'Hashtags generated successfully',
      hashtags: parsed.hashtags,
    })
  } catch (err) {
    console.error('Hashtag generation error:', err.message)

    res.status(500).json({
      message: 'Failed to generate hashtags',
      error: err.message,
    })
  }
}

// @route POST /api/ai/optimize-tone
const optimizeTone = async (req, res) => {
  const {
    caption,
    targetTone,
    platform,
  } = req.body

  try {
    const prompt = `
Rewrite this social media caption in a ${targetTone} tone
for ${platform}:

"${caption}"

Return ONLY a valid JSON object in this exact format:

{
  "optimizedCaption": "rewritten caption here",
  "changes": "brief description of what changed"
}
`

    const response = await gemini.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 600,
        responseMimeType: 'application/json',
      },
    })

    const raw = response.text.trim()
    const parsed = JSON.parse(raw)

    res.status(200).json({
      message: 'Tone optimized successfully',
      optimizedCaption: parsed.optimizedCaption,
      changes: parsed.changes,
    })
  } catch (err) {
    console.error('Tone optimization error:', err.message)

    res.status(500).json({
      message: 'Failed to optimize tone',
      error: err.message,
    })
  }
}

// @route GET /api/ai/history
const getHistory = async (req, res) => {
  try {
    const contents = await Content.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20)

    res.status(200).json({
      contents,
    })
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    })
  }
}

module.exports = {
  generateCaption,
  generateHashtags,
  optimizeTone,
  getHistory,
}