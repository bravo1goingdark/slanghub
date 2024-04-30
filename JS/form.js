document.getElementById('submitForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const shortForm = document.getElementById('shortForm').value;
  const longForm = document.getElementById('longForm').value;

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shortForm, longForm })
    });

    if (response.ok) {
      showMessage('Thanks for Contributing! 😀', 'success');
      document.getElementById('submitForm').reset();
    } else {
      throw new Error('Try Again! 😔');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Failed to submit slang term. Please try again 👍🏿', 'error');
  }
});

function showMessage(message, type) {
  const messageContainer = document.getElementById('messageContainer');
  messageContainer.textContent = message;
  messageContainer.style.display = 'block';
  messageContainer.classList.remove('success-message', 'error-message');
  messageContainer.classList.add(type + '-message');

  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 2000);
}