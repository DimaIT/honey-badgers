export async function askAI(action, input) {
    const prompt = `${action} the input.`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                  "role": "system",
                  "content": prompt,
                },
                {
                  "role": "user",
                  "content": input,
                },
            ],
        }),
    };
    const res = await fetch('https://api.openai.com/v1/chat/completions', params);
    const data = await res.json();
    return data.choices[0]?.message?.content;
}
