export async function askAI(action, input) {
    const key = 'sk-' + 'G0v6coDQfPimmjeyr01PT3BlbkFJ6c1FNxFV4PKmIGZ9VDWh';
    const prompt = `${action} the input.`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
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
