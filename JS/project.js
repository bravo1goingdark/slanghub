async function search() {
  const userInput = document.getElementById('userInput').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch(`http://localhost:3000/search?shortForm=${encodeURIComponent(userInput)}`);
    const data = await response.json();
    
    if (data.longForm) {
      resultDiv.innerHTML = `${data.longForm}`;
    } else {
      resultDiv.innerHTML = 'Slang term not found';
    }
    
    resultDiv.style.display = 'block';
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    resultDiv.innerHTML = 'Error fetching search results. Please try again later.';
    
    resultDiv.style.display = 'block';
  }
}

