const FALLBACK_ARTICLES = [
  {
    title: "National disaster response teams conduct surprise readiness drill",
    source: "Safety Hub Briefing",
    url: "https://example.com/disaster-readiness-drill",
    publishedAt: new Date().toISOString(),
    description: "Cross-agency exercise tested emergency communications and rapid deployment procedures across three metro regions.",
  },
  {
    title: "IMD issues advisory for heavy rainfall across coastal districts",
    source: "IMD Bulletin",
    url: "https://example.com/imd-heavy-rainfall-outlook",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    description: "Citizens urged to review flood evacuation plans and ensure emergency kits are stocked ahead of the approaching weather system.",
  },
  {
    title: "Hospitals update surge capacity plans after annual review",
    source: "Health Preparedness Desk",
    url: "https://example.com/hospital-surge-capacity",
    publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    description: "Facilities confirm oxygen reserves and triage workflows as part of the national readiness mandate.",
  },
];

export const getLatestNews = async (req, res) => {
  const apiKey = process.env.NEWS_API_KEY;
  const endpoint = process.env.NEWS_API_URL || "https://newsapi.org/v2/everything";
  const query =
    process.env.NEWS_API_QUERY ||
    "(disaster OR emergency OR evacuation OR \"public safety\" OR preparedness)";

  if (!apiKey) {
    return res.json({
      source: "fallback",
      articles: FALLBACK_ARTICLES,
    });
  }

  try {
    const params = new URLSearchParams({
      q: query,
      language: "en",
      sortBy: "publishedAt",
      pageSize: "6",
    });

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const payload = await response.json();
    const articles =
      payload?.articles?.map((article) => ({
        title: article?.title,
        description: article?.description,
        url: article?.url,
        source: article?.source?.name,
        publishedAt: article?.publishedAt,
      })) ?? [];

    return res.json({
      source: "live",
      articles: articles.length ? articles : FALLBACK_ARTICLES,
    });
  } catch (error) {
    console.error("Failed to fetch latest news:", error.message);
    return res.status(200).json({
      source: "fallback",
      articles: FALLBACK_ARTICLES,
      error: "Unable to reach live news provider",
    });
  }
};

