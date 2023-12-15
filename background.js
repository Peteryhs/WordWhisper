let userInput = {
    lastSentence: '',
    currentInput: ''
};

let typingTimer;
let prediction;

const textField = document.getElementById('text_field');
let log = document.getElementById('log');
const apiinput = document.getElementById('API input')


textField.addEventListener('input', function(e) {
    clearTimeout(typingTimer);

    const sentences = e.target.value.match(/[^\.!\?]+[\.!\?]+/g);
    if (sentences) {
        userInput.lastSentence = sentences[sentences.length - 1];
    }

    typingTimer = setTimeout(function() {
        userInput.currentInput = e.target.value;

        const prompt = userInput.currentInput + userInput.lastSentence;

        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '' // replace with your actual OpenAI API key
            },
            body: JSON.stringify({
                'prompt': prompt,
                'max_tokens': 10
            })
            
        })
        .then(response => response.json())
        .then(data => {
            prediction = data.choices[0].text;
            console.log(prediction);
            document.getElementById('ghost_text').innerText = prediction;
        })
        .catch(error => console.error('Error:', error));


    }, 1000); // 1 second delay
});



