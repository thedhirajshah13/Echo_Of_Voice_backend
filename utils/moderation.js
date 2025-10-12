import axios from "axios";

export const moderationData = async (message) => {
  // Make sure your env variable is correctly named, e.g., PERSPECTIVE_API_KEY
  console.log(process.env.PERSPECTIVE_API_KEY);

  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.PERSPECTIVE_API_KEY}`;

  try {
    const response = await axios.post(
      url,
      {
        comment: { text: message },
        requestedAttributes: {
          TOXICITY: {},
          INSULT: {},
          PROFANITY: {},
          THREAT: {},
        //   SEXUALLY_EXPLICIT: {},
        //   IDENTITY_ATTACK: {},
        },
        languages: ["en", "hi"] // English + Hindi
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Extract only summary scores for convenience
    const attributeScores = response.data.attributeScores;
    const scores = {};
    for (const key in attributeScores) {
      scores[key.toLowerCase()] = attributeScores[key].summaryScore.value;
    }

    return scores; // {toxicity: 0.8, insult: 0.1, ...}
  } catch (error) {
    console.log("Perspective API error:", error.response?.data || error.message);
    return null;
  }
};
