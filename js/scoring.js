function calculateAudienceScore(row) {
  //convert csv val into #
  // if val is missing use 0
  const clicks = Number(row.clicks) || 0;
  const formSubmit = Number(row.form_submit) || 0;
  const rsvp = Number(row.rsvp) || 0;
  const attended = Number(row.attended) || 0;

  //scoring formula
  //clicks worth 1 pt
  //form subs worth 5 pts
  //RSVPs worth 6 pts
  //attendance worth 10 pts
  const score =
    clicks * 1 +
    formSubmit * 5 +
    rsvp * 6 +
    attended * 10;

  return score;
}

//score turns into digestible metrics
function getSegment(score) {
  if (score >= 21) {
    return "Converted / Priority";
  }

  if (score >= 11) {
    return "High Intent";
  }

  if (score >= 5) {
    return "Warm";
  }

  return "Cold";
}

//recommended marketing action
function getRecommendation(row, score) {
  const clicks = Number(row.clicks) || 0;
  const formSubmit = Number(row.form_submit) || 0;
  const rsvp = Number(row.rsvp) || 0;
  const attended = Number(row.attended) || 0;

  if (attended === 1) {
    return "Add to loyal audience list";
  }

  if (rsvp === 1 && attended === 0) {
    return "Send reminder or post-campaign follow-up";
  }

  if (clicks >= 3 && formSubmit === 0) {
    return "Retarget with clearer call-to-action";
  }

  if (score >= 11) {
    return "Send personalized follow-up";
  }

  return "Keep in nurture campaign";
}

function enrichData(data) {
  return data
    .map(row => {
      const score = calculateAudienceScore(row);

      return {
        ...row,
        audience_score: score,
        segment: getSegment(score),
        recommendation: getRecommendation(row, score)
      };
    })

    .sort((a, b) => b.audience_score - a.audience_score);
}
