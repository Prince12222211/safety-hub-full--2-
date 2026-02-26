import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Simple heuristic fallback if no API key is configured
const heuristicSuggestIncident = (description = "") => {
  const lower = description.toLowerCase();

  let type = "incident";
  if (lower.includes("fire") || lower.includes("smoke")) type = "fire";
  if (lower.includes("flood") || lower.includes("water")) type = "flood";
  if (lower.includes("earthquake") || lower.includes("tremor")) type = "earthquake";

  let priority = "medium";
  if (lower.includes("injury") || lower.includes("unconscious") || lower.includes("trapped")) {
    priority = "urgent";
  } else if (lower.includes("evacuate") || lower.includes("fire") || lower.includes("collapse")) {
    priority = "high";
  } else if (lower.includes("minor") || lower.includes("near miss")) {
    priority = "low";
  }

  const title =
    description.length > 80
      ? description.slice(0, 77).trimEnd() + "..."
      : description || "Safety incident reported";

  const suggestions = [
    "Ensure everyone is in a safe location away from immediate hazards.",
    "Notify on-site safety coordinator or emergency response team.",
    "Document any witnesses and capture photos if it is safe to do so.",
  ];

  return { title, type, priority, suggestions };
};

export const suggestIncident = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length < 10) {
      return res.status(400).json({ msg: "Please provide a longer description for AI suggestions." });
    }

    // If no OpenAI API key, fall back to heuristic logic
    if (!OPENAI_API_KEY) {
      const result = heuristicSuggestIncident(description);
      return res.json({
        source: "heuristic",
        ...result,
      });
    }

    const systemPrompt =
      "You are a safety incident triage assistant for a disaster-readiness dashboard. " +
      "Given a free-text incident description, you must propose: " +
      "(1) a concise incident title (~8 words), " +
      "(2) an incident type from this set: [incident, hazard, near-miss, concern, fire, flood, earthquake, medical], " +
      "(3) a priority level from this set: [low, medium, high, urgent], " +
      "(4) 2-3 short next-step suggestions for responders. " +
      "Reply as strict JSON with keys: title, type, priority, suggestions (array of strings). Do not include extra text.";

    const userPrompt = `Incident description:\n\"\"\"\n${description}\n\"\"\"`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error:", await response.text());
      const result = heuristicSuggestIncident(description);
      return res.json({
        source: "heuristic",
        ...result,
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = heuristicSuggestIncident(description);
    }

    return res.json({
      source: "openai",
      ...parsed,
    });
  } catch (error) {
    console.error("AI suggestIncident error:", error);
    const fallback = heuristicSuggestIncident(req.body?.description || "");
    return res.status(200).json({
      source: "heuristic",
      ...fallback,
      error: "AI provider unavailable, used heuristic instead",
    });
  }
};

