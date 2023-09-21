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
    const key = "sk-" + "G0v6coDQfPimmjeyr01PT3BlbkFJ6c1FNxFV4PKmIGZ9VDWh";
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            prompt: `Summarize the following text in 20 words or less and also provide links to resources regarding it: ${text}`,
            model: "gpt-3.5-turbo-instruct",
            max_tokens: 50,
        }),
    };
    const res = await fetch("https://api.openai.com/v1/completions", params);
    const responseData = await res.json();
    const summary = responseData.choices[0]?.text || "";
    return summary;
}

export async function askAItoTranslate(text, language) {
    // normalize action
    const apiUrl = "https://api.openai.com/v1/completions";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`, // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          prompt: `Please translate the following text to ${language}: ${text}`,
          model: "gpt-3.5-turbo-instruct",
          max_tokens: 50, // Adjust as needed for your summary length
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      const summary = responseData.choices[0]?.text || "";
  
      return summary;
    } catch (error) {
      console.error(error);
      throw new Error(
        "An error occurred while fetching the summary from ChatGPT."
      );
    }
  }