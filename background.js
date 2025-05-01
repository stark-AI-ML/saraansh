var input;
var output;
var DATA;

// on each new Video we need to let content.js know its new as it was not uploading.....
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
        changeInfo.status === "complete" &&
        tab.url?.includes("youtube.com/watch")
    ) {
        console.log("Detected YouTube video page:", tab.url);
        setTimeout(() => {
            chrome.tabs.sendMessage(tabId, {
                type: "newVideo",
                ytUrl: tab.url
            }).catch(err => {
                // Handling cases where content script is not ready
                console.log("Message failed (content script not ready):", err);
            });
        }, 3000
        )
    }
});


function handleTranscriptPrompt(tranSript, prompt) {
    // have to handle of transcript.length is too much for AI text limit, 
    //  need loop(to send trascript in chunks to ai and keep updating outPut + let know ai you are doing that and use <p> )
    //  later .. don't forget...
    input = tranSript + prompt; // simple we are not returining cuz i am thinking about input update...
}



const token = process.env.ApiKey;
const endpoint = "https://models.github.ai/inference/chat/completions";
const model = "openai/gpt-4.1";

async function main(Script, Prompt) {

    handleTranscriptPrompt(Script, Prompt);
    try {

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "You are an AI Assitant" },
                    { role: "user", content: input }
                ],
                temperature: 1,
                top_p: 1,
                model: model
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        DATA = data;
        console.log(data.choices[0].message.content);
        output = data.choices[0].message.content;
    } catch (err) {
        console.error("The sample encountered an error:", err);
    }
}

// listening to the prompt message... 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "REQUEST_AI") {
        main(message.data.transScriptText, message.data.prompt).then(response => {
            sendResponse({ html: output, data: DATA });
            console.log(output);
        });
    }
    return true;
});






