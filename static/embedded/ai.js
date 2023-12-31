// export async function askAI(action, input) {
//     // normalize action
//     action = action.toLowerCase().trim();
//     const key = 'sk-' + 'G0v6coDQfPimmjeyr01PT3BlbkFJ6c1FNxFV4PKmIGZ9VDWh';
//     const prompt = `${action} the input.`;
//     const params = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${key}`,
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 {
//                   "role": "system",
//                   "content": prompt,
//                 },
//                 {
//                   "role": "user",
//                   "content": input,
//                 },
//             ],
//         }),
//     };
//     const res = await fetch('https://api.openai.com/v1/chat/completions', params);
//     const data = await res.json();
//     return data.choices[0]?.message?.content;
// }

export async function askAI(text) {
  return ai(`Summarize the following text in 20 words or less and also provide links to resources regarding it: ${text}`);
}

export async function askAItoTranslate(text, language) {
  return ai(`Please translate the following text to ${language}: ${text}`);
}

export async function askAItoSummarize(text, percent) {
  const target = Math.floor(text.length / 100 * percent / 4);
  console.log(`no more than ${target} words`);
  console.assert(target < 1000); // just in case
  return ai(`Summarize the following text in ${target} words or less: ${text}`, target * 3);
}


async function ai(prompt, maxTokens = 100) {
  const key = "sk-" + "G0v6coDQfPimmjeyr01PT3BlbkFJ6c1FNxFV4PKmIGZ9VDWh";
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      prompt,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: Math.floor(maxTokens),
    }),
  };
  const res = await fetch("https://api.openai.com/v1/completions", params);
  const responseData = await res.json();
  const summary = responseData.choices[0]?.text || "";
  return summary.trim();
}
