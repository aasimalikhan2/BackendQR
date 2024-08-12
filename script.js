document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});

async function handleSubmit() {
    const input = document.getElementById('textInput').value;

    if (input.trim() === '') {
        alert('Please enter some text.');
        return;
    }

    try {
        const response = await fetch('https://e5bcb5a7-485d-4dcd-89e8-1c4f361ad743-00-2w2c6l4hr6pnf.sisko.replit.dev/generate-qr', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "text": input
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseJson = await response.json();
        const imageUrl = responseJson.imageUrl;
        
        // Store the text and image URL in localStorage
        storeInLocalStorage(input, imageUrl);

        // Update the history list
        updateHistoryList();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

function storeInLocalStorage(text, imageUrl) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({ text, imageUrl });
    localStorage.setItem('history', JSON.stringify(history));
}

function updateHistoryList() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear existing list

    const history = JSON.parse(localStorage.getItem('history')) || [];

    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.text;
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.text;
        img.style.width = '100px'; // Adjust image size as needed
        listItem.appendChild(img);
        historyList.appendChild(listItem);
    });
}

function clearLocalStorage()
{
    localStorage.clear();
    updateHistoryList();
}

function loadHistory() {
    updateHistoryList();
}
