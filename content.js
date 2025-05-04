var transScriptText;

let summaryHtml = {
    conciseSummaryHtml: null,
    detailedSummaryHtml: null,
    normalSummaryHtml: null
}

// create a switch color function set all colors to basics color and return color string and set it to type simple; 



// function switchColor(color) {
//     document.querySelector(".summaryBtn").style.backgroundColor = "#90e0ef" // not good handle i think but still i think for not it is good..... it will save time complexity
//     return color;
// }



function handleNewVideo(ytUrl) {
    console.log(ytUrl, "   :  ", i);

    // I have to handle this double repititon of if exists and if ! 
    function handleSummaryClick(type) {
        if (type === "normal") {
            if (summaryHtml.normalSummaryHtml) {
                // document.getElementById("normal-summary").style.backgroundColor = switchColor("red");


                document.getElementById("outputHtml").innerHTML = `
                        <div style="background-color: white; padding: 10px">
                          ${summaryHtml.normalSummaryHtml}
                        </div>
                      `;
                return false;
            }
            else return true;
        }
        if (type === "concise") {
            if (summaryHtml.conciseSummaryHtml) {
                // document.getElementById("concise-summary").style.backgroundColor = switchColor("red");
                document.getElementById("outputHtml").innerHTML = `
                <div style="background-color: white; padding: 10px">
                  ${summaryHtml.conciseSummaryHtml}
                </div>
              `;
                return false;
            }
            else return true;
        }
        if (type === "detailed") {
            if (summaryHtml.detailedSummaryHtml) {
                // document.getElementById("detailed-summary").style.backgroundColor = switchColor("red");

                document.getElementById("outputHtml").innerHTML = `
                <div style="background-color: white; padding: 10px">
                  ${summaryHtml.detailedSummaryHtml}
                </div>
              `;
                return false;
            }
            else return true;
        }
    }



    function clickShow() {
        setTimeout(
            () => {

                const getTranscriptButton = document.querySelector("ytd-video-description-transcript-section-renderer")?.children[2];

                if (getTranscriptButton) {
                    console.log(getTranscriptButton);


                    const button = getTranscriptButton?.children[0]?.children[0]?.children[0]?.children[0];



                    if (button) {
                        button.click();
                        console.log("Button clicked successfully!");
                    } else {
                        console.log("Button element structure does not match.");
                    }
                } else {
                    console.log("Parent element not found.");
                }
            }, 3000
        )
    }
    clickShow();


    // getting transcript after 10 sec... so before users clicks we are ready with our transcript..
    setTimeout(() => {
        console.log("hello from transcipt Getter");
        // const tryFirstNode = document.querySelector("ytd-engagement-panel-section-list-renderer");
        const val = document.querySelector("ytd-transcript-renderer");
        console.log(val);
        transScriptText = val.innerText;

        // checking
        console.log(val.innerText);
    }, 6000);




    setTimeout(() => {
        // Creating button for click method
        const leftControl = document.querySelector(".ytp-left-controls");
        let summaryBtn = document.getElementById("summary-btn");



        // if summaryBtn is not in youtube creating one...
        if (!summaryBtn) {
            summaryBtn = document.createElement("button");
            summaryBtn.id = "summary-btn";
            summaryBtn.style.border = "none";
            summaryBtn.style.background = "transparent"; 
            summaryBtn.style.cursor = "pointer"; 
            summaryBtn.style.display = "flex"; 
            summaryBtn.style.alignItems = "center"; 
            summaryBtn.style.justifyContent = "center"; 
            summaryBtn.style.width = "60px"; 
            summaryBtn.style.height = "60px";
            summaryBtn.style.borderRadius = "50%"; 
            summaryBtn.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; 

            // Adding SVG for the Hindi letter "श" inside a circle
            summaryBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                    <!-- Circle Background -->
                    <circle cx="19" cy="19" r="19" fill="white" />
                    <!-- Text: Hindi Letter "श" -->
                    <text x="19" y="28" font-size="23" text-anchor="middle" fill="black" font-family="Arial, sans-serif">
                        श
                    </text>
                </svg>
            `;

            leftControl.appendChild(summaryBtn);
        }

        let similarPrompt = `	Generate a single, self-contained HTML snippet intended to be embedded under a container < div >  (do not include  < html > ,  < head > , or  < body >  tags). This snippet should create a clean, minimalist, and visually appealing summary section based on a YouTube transcript.
    
    Requirements:
    
    1. **HTML Structure and Semantics:**
       - Use semantic HTML elements like < section > ,  < header > ,  < article > ,  < p > ,  < ul > , and  < li >  to structure the content logically.
       - The summary must have clear headings that break the content into sections (e.g., Overview, Key Points, and Conclusion).
       - Include descriptive paragraphs and bullet-point lists to explain the transcript in full detail.
       - Add a conclusion section that encapsulates the main takeaways of the transcript.
    
    2. **CSS Styling:**
       - Use inline or internal CSS (within a < style >  tag) for styling.
       - Apply a minimalist design with a responsive layout for both mobile and desktop views.
       - Set font sizes between 1.5rem and 4rem to ensure the text is easily readable on all devices.
       - Keep the styling light and clean to enhance readability without external dependencies.
    
    3. **JavaScript Interactivity:**
       - Embed JavaScript directly in the file (inside a < script >  tag).
       - Enable interactivity by adding clickable timestamps (e.g., “00:01”, “00:45”, “01:30”) that, when clicked, either highlight their corresponding section or log the timestamp to the console.
       - I provided you link so it is easy to do ${ytUrl}. just update t in this link https://www.youtube.com/watch?v=id&t=90s
    
    4. **Content and Test Data:**
       - Include sample placeholder text that serves as a detailed summary of the YouTube transcript, explaining every segment of the transcript clearly.
       - The summary should cover various aspects of the transcript including an 'Overview', 'Detailed Breakdown' with bullet points for each key point, and a final 'Conclusion' section.
       - Integrate sample clickable timestamps near relevant sections for demonstration purposes.
    
    5. **Additional Instructions:**
       - Do not output any text or code before the first opening < div >  tag; the snippet should be ready for direct embedding.
       - Ensure each section (transcript summary, timestamps, conclusion) can function independently within the same page without external files or dependencies.
       - Optimize the snippet for clarity, readability, and ease of future updates via JavaScript.
    
    Please produce the complete HTML code snippet (including internal CSS and JavaScript) that fully meets these specifications. `



        // handeling the click on the summarya options 

        function SummaryOptionsClick(type) {
            let prompt;

            if (type === "normal") {
                // document.getElementById(`${type}-summary`).style.backgroundColor = switchColor("red");

                prompt = `
             create a clear and visually appealing summary section formatted with headings, paragraphs,bullet points and styled using CSS. 
             Ensure the design is minimalist and readable.` + similarPrompt;

                console.log(prompt);
            }

            if (type === "detailed") {
                // document.getElementById(`${type}-summary`).style.backgroundColor = switchColor("red");

                prompt = `create a clear and visually appealing summary section formatted with headings, paragraphs,bullet points and styled using CSS Ensure the design is minimalist and readable.
                 make this in detailed version try to provide every cocept with timeStamps ${ytUrl} in this.. that you found but priprity is to cover the whole transcript..
                ` + similarPrompt;
            }

            if (type === "concise") {
                // document.getElementById(`${type}-summary`).style.backgroundColor = switchColor("red");

                prompt = `create a clear and visually appealing summary section formatted with headings, paragraphs,bullet points and styled using CSS Ensure the design is minimalist and readable.
                 make this in concise version try to cover all transcript but in concise manner...` + similarPrompt;

            }



            // sending whole modified input to the background.js...
            chrome.runtime.sendMessage({ action: "sendTranscript", type: "REQUEST_AI", data: { prompt, transScriptText } },

                (response) => {
                    if (chrome.runtime.lastError || !response) {
                        console.error("Error:", chrome.runtime.lastError);
                        return;
                    }

                    document.getElementById("outputHtml").innerHTML = `
                        <div style="background-color: white; padding: 10px">
                          ${response.html}
                        </div>
                      `;

                    summaryHtml[`${type}SummaryHtml`] = response.html;

                    console.log("HTML : \n", response.html);
                    console.log("Received Data:", response.DATA);

                }
            );
        }

        let summaryOptionHTML =
            `         
                            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Navbar with Buttons</title>
            <style>
            nav {
                background: linear-gradient(90deg, #00b4d8, #0077b6);
                display: flex;
                justify-content: center;
                padding: 15px 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
          nav button {
                color: #fefefe;
                background-color: transparent;
                border: 2px solid white;
                padding: 10px 20px;
                margin: 0 10px;
                border-radius: 20px;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease;
            }
            button:hover {
                background-color: #90e0ef;
                color: #0077b6;
                transform: scale(1.05);
            }
            </style>
            </head>
    
                <nav>
                    <button class="summaryBtn"  id="normal-summary">Normal Summary</button>
                    <button class="summaryBtn" id="detailed-summary">Detailed Summary</button>
                    <button class="summaryBtn" id="concise-summary">Concise Summary</button>
                </nav>
                <div id = "outputHtml" > </div>
         
            
            `




        // adding navBAr for summaryOption with summaryOptionHTML with three button.....
        summaryBtn.addEventListener("click",
            () => {

                console.log("summaryBtn working");
                const summaryParent = document.querySelector("ytd-watch-next-secondary-results-renderer")?.children[1];
                let summaryOptions = document.getElementById("summary-Options");

                if (!summaryOptions) {
                    summaryOptions = document.createElement("div");
                    summaryOptions.id = "summary-Options";

                    const check = "hello i am checking for if .innerHtml can access me";

                    summaryOptions.innerHTML = summaryOptionHTML;
                    summaryParent.insertBefore(summaryOptions, summaryParent.firstChild);
                    console.log("Summary options added!");

                    // creating Onclik method for the all summary options...    

                    const normalSummaryBtn = document.getElementById("normal-summary");
                    const detailedSummaryBtn = document.getElementById("detailed-summary");
                    const conciseSummaryBtn = document.getElementById("concise-summary");


                    normalSummaryBtn.addEventListener("click", () => {
                        if (handleSummaryClick)
                            SummaryOptionsClick("normal");
                    });

                    detailedSummaryBtn.addEventListener("click", () => {
                        SummaryOptionsClick("detailed");
                    });

                    conciseSummaryBtn.addEventListener("click", () => {
                        SummaryOptionsClick("concise");
                    });


                } else {
                    console.log("Summary options already exist. No action performed.");
                }



            });
    }, 10 * 1000);

}



let i = 0; // for testing if content value get updated
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "newVideo") {
        console.log("Initializing with URL:", message.ytUrl);
        i += 0;
        console.log(" content before new video is loaded")
        handleNewVideo(message.ytUrl);
    }
});





